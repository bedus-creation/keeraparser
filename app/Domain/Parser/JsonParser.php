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
    public function toJson(Schema $schema, string $path): array
    {
        $result['id']          = $schema->id;
        $result['parent_id']   = $schema->schema_id;
        $result['path']        = $path;
        $result['name']        = $schema->name;
        $result['type']        = $schema->type;
        $result['required']    = $schema->required;
        $result['description'] = $schema->description;
        $result['enum']        = $schema->enum;
        $result['items']       = $schema->items;

        $currentPath = implode('.', array_map(strtolower(...), array_filter([$path, $schema->name])));

        $handleObject = function ($id) use ($currentPath) {
            $properties = Schema::query()->where('schema_id', $id)->get();

            $data = [];
            foreach ($properties as $property) {
                [$name, $value] = $this->toJson($property, $currentPath);
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

        return [$schema->name, array_filter($result, fn($item) => !is_null($item))];
    }

    public function toJsonSchema(Schema $schema)
    {
        $json = $this->toJson($schema, '');

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

    public function jsonToSchema(string $key, array $json, int|null $parentId = null, int|null $rootId = null): int
    {
        $required    = Arr::get($json, 'required', false);
        $type        = Arr::get($json, 'type', 'string');
        $description = Arr::get($json, 'description', '');
        $enum        = Arr::get($json, 'enum');

        $schema = Schema::query()->create([
            'name'        => $key,
            'schema_id'   => $parentId,
            'description' => $description,
            'required'    => $required,
            'type'        => empty($enum) ? $type : 'enum',
            'enum'        => $enum,
        ]);

        $handleObject = function (array $object) use ($schema) {
            $properties = Arr::get($object, 'properties') ?? [];

            foreach ($properties as $key => $property) {
                $this->jsonToSchema($key, $property, $schema->id);
            };
        };

        $handleArray = function (array $json) use ($schema): void {
            $type = Arr::get($json, 'items.type', 'string');

            # It the array is primitive data types
            if (!in_array($type, ['array', 'object'])) {
                $schema->update([
                    'items.type' => $type,
                ]);

                return;
            }

            $properties = Arr::get($json, 'items.properties') ?? [];
            foreach ($properties as $key => $property) {
                $this->jsonToSchema($key, $property, $schema->id);
            };
        };

        match ($type) {
            'object' => $handleObject($json),
            'array' => $handleArray($json),
            default => null,
        };

        if (is_null($rootId)) {
            $rootId = $schema->id;
        }

        return $rootId;
    }
}
