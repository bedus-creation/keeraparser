<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class ParserFilter implements Filter
{
    public function __invoke(Builder $query, mixed $value, string $property)
    {
        $query->whereLike('name', '%'.$value.'%');
    }
}
