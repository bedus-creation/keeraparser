<?php

namespace Api\V1\Controllers;

use Api\V1\Requests\ParserParseRequest;
use App\Constants\ChatStatus;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;

#[Group('Parsers')]
class ParserParseController extends Controller
{
    /**
     * Parse PDF
     *
     * Parses uploaded PDF files and retrieves data as specified by the parser's JSON schema.
     *
     *  To use this endpoint:
     *  1. Create an [API key](https://keeraparser.com/api-keys) if you don't have one.
     *  2. Configure your [PDF parsers](https://keeraparser.com/parsers) as needed.
     *
     *  Once setup is complete, you're ready to hit this endpoint.
     *
     * @param int $id The Parser's id that you have configured. [PDF parsers](https://keeraparser.com/parsers)
     */
    public function __invoke(ParserParseRequest $request, int $id): JsonResponse
    {
        return response()->json([
            /**
             * @var int
             * Unique identifiers to track your parsing request
             */
            'id'                      => 1,

            /**
             * @var string
             * [Parser](https://keeraparser.com/parsers) name that you have given.
             */
            'parser_name'             => '',

            /**
             * @var ChatStatus
             */
            'status'                  => 'completed',

            /**
             * @var Carbon
             * The Parsing started date in YYYY-MM-DD H:i:s format
             */
            'created_at'              => now(),

            /**
             * @var Carbon
             * The Parsing completed timestamp in YYYY-MM-DD H:i:s format
             */
            'completed_at'            => now()->format('Y-m-d H:i:s'),

            /**
             * @var array
             * The structured json response as defined in Parser.
             */
            'structure_json_response' => [
            ],
        ]);
    }
}
