<?php

const BASE_PATH = '/Users/ellite/code/explore/keera-docs';

require_once BASE_PATH.'/vendor/autoload.php';

use App\Domain\Parser\JsonParser;
use Illuminate\Foundation\Console\Kernel;

$app = require BASE_PATH.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$data   = file_get_contents(database_path('migrations/schema.json'));
$schema = json_decode($data, true);

//use Swaggest\JsonSchema\Schema;
//$schema = Schema::import(json_decode($data));

function parseSchema(\App\Models\Schema $schema)
{
    $result['type']        = $schema->type;
    $result['description'] = $schema->description;
    $result['enum']        = $schema->enum;
    $result['items']       = $schema->items;

    $handleObject = function ($id) {
        $properties = \App\Models\Schema::query()->where('schema_id', $id)->get();
        $data       = [];
        foreach ($properties as $property) {
            [$name, $value] = parseSchema($property);
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

$data = [
    [
        'id'          => 1,
        'name'        => 'Resume',
        'description' => 'Resume of a candidate',
        'type'        => 'object'
    ],
    [
        'id'          => 2,
        'schema_id'   => '1',
        'name'        => 'stringExample',
        'description' => 'A string value',
        'type'        => 'string'
    ],
    [
        'id'          => 3,
        'schema_id'   => '1',
        'name'        => 'enumExample',
        'description' => 'A string with limited possible values',
        'enum'        => json_encode(["option1", "option2", "option3"])
    ],
    [
        'id'          => 4,
        'schema_id'   => '1',
        'name'        => 'arrayExample',
        'type'        => 'array',
        'items'       => json_encode([
            'type' => 'string'
        ]),
        "description" => "An array of strings"
    ],
    [
        'id'          => 5,
        'schema_id'   => '1',
        'name'        => 'arrayOfObjectsExample',
        'type'        => 'array',
        'items'       => json_encode([
            'type' => 'object'
        ]),
        "description" => "An array of strings"
    ],
    [
        'id'        => 6,
        'schema_id' => '5',
        'name'      => 'name',
        'type'      => 'string',
    ],

    [
        'id'        => 7,
        'schema_id' => '5',
        'name'      => 'age',
        'type'      => 'integer',
    ],

    [
        'id'        => 8,
        'schema_id' => '1',
        'name'      => 'objectExample',
        'type'      => 'object',
    ],

    [
        'id'        => 9,
        'schema_id' => '8',
        'name'      => 'nestedString',
        'type'      => 'string',
    ],

    [
        'id'        => 10,
        'schema_id' => '8',
        'name'      => 'nestedInteger',
        'type'      => 'integer',
    ],
];

$schema = \App\Models\Schema::query()->where('id', 1)
    ->first();

dd(json_encode((new JsonParser())->toJson($schema)[1]));

//foreach ($data as $datum) {
//    \App\Models\Schema::query()->insert([
//        ...$datum,
//        'created_at' => now(),
//    ]);
//}


//\App\Models\Schema::query()
//    ->create([
//        'schema_id'   => '1',
//        'name'        => 'name',
//        'description' => 'Name of the candidate',
//        'type'        => 'string'
//    ]);

//
//$schema = new \App\Domain\Parser\ObjectSchema(
//    name: 'StructureResume',
//    description: 'A structured movie review',
//    properties: [],
//    requiredFields: []
//);
//$file   = json_decode(file_get_contents(config_path('parser/resume.json')), true);
//$schema->addProperty(new \Prism\Prism\Schema\NumberSchema('age', 'Age of the candidate'));
//
//function handleString(string $name, string $description)
//{
//    global $schema;
//    $schema->addProperty(new \Prism\Prism\Schema\StringSchema($name, $description));
//}
//
//function handleArray(string $name, array $array)
//{
//    global $schema;
//
//    if(\Illuminate\Support\Arr::has($array, 'type')){
//
//    }
////    $schema->addProperty(new \Prism\Prism\Schema\StringSchema($name, $description));
//}
//
//foreach ($file as $key => $item) {
//    match (gettype($item)) {
//        'string' => handleString($key, $item),
//        'array' => handleArray($key, $item),
//    };
//}
////new \Prism\Prism\Schema\ArraySchema()
//dd($schema->toArray());

//\App\Core\Services\Parser::parse(file_get_contents(config_path('parser/resume.json')));
