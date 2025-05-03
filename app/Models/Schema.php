<?php

namespace App\Models;

use App\Domain\Parser\JsonParser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property-read  int     $id
 * @property-read int      $schema_id
 * @property-read  boolean $required
 */
class Schema extends Model
{
    use SoftDeletes;

    protected $table = 'schema';

    protected $fillable = [
        'id',
        'name',
        'schema_id',
        'description',
        'type',
        'required',
        'enum',
        'items'
    ];

    public function casts(): array
    {
        return [
            'required' => 'boolean',
            'enum'     => 'array',
            'items'    => 'array'
        ];
    }

    public function toArraySchema(): array
    {
        return (new JsonParser())->toJson($this, '');
    }

    public function toJsonSchema()
    {
        return (new JsonParser())->toJsonSchema($this);
    }
}
