<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property-read Parser $parser
 */
class Chat extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'status',
        'parser_id',
        'parser_type',
        'payload',
        'response_completed_at',
        'response',
        'user_id',
    ];

    public function parser(): BelongsTo
    {
        return $this->belongsTo(Parser::class);
    }
}
