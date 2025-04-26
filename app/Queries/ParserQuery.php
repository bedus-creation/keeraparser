<?php

namespace App\Queries;

use App\Models\Parser;
use Illuminate\Database\Eloquent\Builder;
use App\Data\ParserInfoDto;

class ParserQuery
{
    public static function getParserList(string|null $search = null): array
    {
        return ParserInfoDto::collect(
            items: Parser::query()
                ->select('id', 'name')
                ->where('type', 'resume')
                ->when($search, function (\Illuminate\Database\Query\Builder $query) use ($search) {
                    $query->whereLike('name', '%'.$search.'%');
                })
                ->where(function (Builder $query) {
                    $query->where('user_id', auth()->id())
                        ->orWhereNull('user_id');
                })
                ->get()
        )->toArray();
    }
}
