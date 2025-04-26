<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read string $name
 * @property-read Schema $schema
 */
class Parser extends Model
{
    protected $table = 'parsers';

    public function schema(): BelongsTo
    {
        return $this->belongsTo(Schema::class);
    }
}
