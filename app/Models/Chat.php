<?php

namespace App\Models;

use App\Constants\ChatStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property-read int        $id
 * @property-read Parser     $parser
 * @property-read ChatStatus $status
 * @property-read Carbon     $created_at
 * @property-read Carbon     $response_completed_at
 * @property-read array      $response
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

    public function casts(): array
    {
        return [
            'status'                => ChatStatus::class,
            'payload'               => 'array',
            'response_completed_at' => 'datetime',
            'response'              => 'array',
        ];
    }

    public function parser(): BelongsTo
    {
        return $this->belongsTo(Parser::class);
    }
}
