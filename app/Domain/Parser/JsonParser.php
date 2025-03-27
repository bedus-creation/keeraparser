<?php

namespace App\Domain\Parser;

use App\Models\Schema;
use Illuminate\Support\Arr;
use Prism\Prism\Schema\ArraySchema;
use Prism\Prism\Schema\EnumSchema;
use Prism\Prism\Schema\NumberSchema;
use Prism\Prism\Schema\ObjectSchema;
use Prism\Prism\Schema\StringSchema;

class JsonParser
{
    public function toJson(Schema $schema): array
    {
        $result['id']          = $schema->id;
        $result['name']        = $schema->name;
        $result['type']        = $schema->type;
        $result['description'] = $schema->description;
        $result['enum']        = $schema->enum;
        $result['items']       = $schema->items;

        $handleObject = function ($id) {
            $properties = Schema::query()->where('schema_id', $id)->get();
            $data       = [];
            foreach ($properties as $property) {
                [$name, $value] = $this->toJson($property);
                $data[$name] = $value;
            }

            return $data;
        };

        $properties = match ($schema['type']) {
            'object' => $handleObject($schema->id),
            default => null
        };

        if (\Illuminate\Support\Arr::get($result, 'items.type') === 'object') {
            $arrayProperties               = $handleObject($schema->id);
            $result['items']['properties'] = $arrayProperties;
        }

        $result['properties'] = $properties;

        return [$schema->name, array_filter($result)];
    }

    public function toJsonSchema(Schema $schema)
    {
        $json = $this->toJson($schema);

        return $this->arrayToSchema($json[1]);
    }

    public function arrayToSchema(array $json)
    {
        $type = Arr::get($json, 'type', 'string');

        $handleObject = function (array $object) {
            $properties = Arr::get($object, 'properties') ?? [];

            $propertiesSchemas = [];
            foreach ($properties as $property) {
                $propertiesSchemas[] = $this->arrayToSchema($property);
            };

            return new ObjectSchema(
                name: Arr::get($object, 'name', ''),
                description: Arr::get($object, 'description', ''),
                properties: $propertiesSchemas,
            );
        };

        $handleArray = function ($json, $name, $description) use ($handleObject) {
            $properties = Arr::get($json, 'items.properties') ?? [];

            $propertiesSchemas = [];
            foreach ($properties as $property) {
                $propertiesSchemas[] = $this->arrayToSchema($property);
            };

            return new ArraySchema(
                name: $name,
                description: $description,
                items: Arr::get($json, 'items.type') === 'object'
                    ? new ObjectSchema(name: '', description: '', properties: $propertiesSchemas)
                    : $this->arrayToSchema([
                        'name'        => '',
                        'description' => '',
                        'type'        => Arr::get($json, 'items.type'),
                    ]),
            );
        };

        $name        = Arr::get($json, 'name', '');
        $description = Arr::get($json, 'description', '');

        return match ($type) {
            'string' => new StringSchema(
                name: $name,
                description: $description,
            ),
            'integer', 'number' => new NumberSchema(
                name: $name,
                description: $description,
            ),
            'object' => $handleObject($json),
            'enum' => new EnumSchema(
                name: $name,
                description: $description,
                options: Arr::get($json, 'enum') ?? [],
            ),
            'array' => $handleArray($json, $name, $description),
        };
    }
}
