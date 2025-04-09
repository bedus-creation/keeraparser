<?php

namespace App\Data;

use App\Models\Chat;
use App\Transformers\DateTransformer;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class ChatData extends Data
{
    public function __construct(
        public string $id,
        #[WithTransformer(DateTransformer::class)]
        public Carbon $created_at,

        public ParserInfoData $parser,
    ) {}
}
