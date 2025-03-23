<?php

namespace App\Domain\Parser;

use App\Models\Schema;

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
}
