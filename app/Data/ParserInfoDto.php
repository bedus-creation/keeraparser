<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ParserInfoDto extends Data
{
    public function __construct(
        public string $id,
        public string $name,
    ) {}
}
