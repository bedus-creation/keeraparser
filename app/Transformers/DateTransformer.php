<?php

namespace App\Transformers;

use Carbon\Carbon;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Support\Transformation\TransformationContext;
use Spatie\LaravelData\Transformers\Transformer;

class DateTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value, TransformationContext $context): array
    {
        $diff = now()->diffInDays($value, true) <= 1
            ? Carbon::parse($value)->diffForHumans()
            : Carbon::parse($value)->format('Y-m-d');

        return [
            'formatted' => Carbon::parse($value)->format('Y-m-d'),
            'diff'      => $diff,
        ];
    }
}
