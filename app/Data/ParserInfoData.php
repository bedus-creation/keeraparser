<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ParserInfoData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
    ) {}
}
