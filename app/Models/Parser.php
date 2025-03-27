<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property-read Schema $schema
 */
class Parser extends Model
{
    protected $table = 'parsers';

    public function schema(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Schema::class);
    }
}
