<?php

namespace App\Queries;

use App\Models\Parser;

class ParserQuery
{
    public static function getParserList(): array
    {
        return \App\Data\ParserListData::collect(
            items: Parser::query()
                ->select('id', 'name')
                ->where('type', 'resume')
                ->where('user_id', auth()->id())
                ->get()
        )->toArray();
    }
}
