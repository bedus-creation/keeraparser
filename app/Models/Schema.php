<?php

namespace App\Models;

use App\Domain\Parser\JsonParser;
use Illuminate\Database\Eloquent\Model;

class Schema extends Model
{
    protected $table = 'schema';

    protected $fillable = [
        'id',
        'name',
        'schema_id',
        'description',
        'type',
        'enum',
        'items'
    ];

    public function casts()
    {
        return [
            'enum'  => 'array',
            'items' => 'array'
        ];
    }

    public function toArraySchema(): array
    {
        return (new JsonParser())->toJson($this);
    }
}
