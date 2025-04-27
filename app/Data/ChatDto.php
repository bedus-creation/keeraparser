<?php

namespace App\Data;

use App\Constants\ChatStatus;
use App\Models\Chat;
use App\Transformers\DateTransformer;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class ChatDto extends Data
{
    public function __construct(
        public string $id,
        #[WithTransformer(DateTransformer::class)]
        public Carbon $created_at,

        public ChatStatus $status,

        #[WithTransformer(DateTransformer::class)]
        public Carbon|null $response_completed_at,

        public ParserInfoDto $parser,
    ) {}
}
