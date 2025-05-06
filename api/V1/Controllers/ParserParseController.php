<?php

namespace Api\V1\Controllers;

use Api\V1\Requests\ParserParseRequest;
use App\Actions\ChatInitiateAction;
use App\Constants\ChatStatus;
use App\Data\ChatStoreDto;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use Carbon\Carbon;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

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
     * @param  int  $id  The Parser's id that you have configured. [PDF parsers](https://keeraparser.com/parsers)
     *
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function __invoke(
        ParserParseRequest $request,
        ChatInitiateAction $action,
        int $id
    ): JsonResponse {
        $chatStoreDto = ChatStoreDto::from([...$request->all(), 'parser_id' => $id]);

        $chat = $action
            ->prepare($request->user(), $chatStoreDto)
            ->processSync()
            ->execute();

        $chat = Chat::query()->with('parser')->findOrFail($chat->id);

        return response()->json([
            /**
             * @var int
             *          Unique identifiers to track your parsing request
             */
            'id' => $chat->id,

            /**
             * @var string
             *             [Parser](https://keeraparser.com/parsers) name that you have given.
             */
            'parser_name' => $chat->parser->name,

            /**
             * @var ChatStatus
             */
            'status' => $chat->status,

            /**
             * @var Carbon
             *             The Parsing started date in YYYY-MM-DD H:i:s format
             */
            'created_at' => $chat->created_at?->format('Y-m-d H:i:s'),

            /**
             * @var Carbon
             *             The Parsing completed timestamp in YYYY-MM-DD H:i:s format
             */
            'completed_at' => $chat->response_completed_at?->format('Y-m-d H:i:s'),

            /**
             * @var array
             *            The structured json response as defined in Parser.
             */
            'structure_json_response' => $chat->response,
        ]);
    }
}
