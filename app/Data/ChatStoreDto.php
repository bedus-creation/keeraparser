<?php

namespace App\Data;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;


#[MapInputName(SnakeCaseMapper::class)]
#[MapName(SnakeCaseMapper::class)]
class ChatStoreDto extends Data
{
    public function __construct(
        public int $parserId,
        /** @var array<int, UploadedFile> $files */
        public array $files,
    ) {}
}
