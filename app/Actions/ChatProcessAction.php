<?php

namespace App\Actions;

use App\Constants\ChatStatus;
use App\Models\Chat;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Prism;
use Prism\Prism\ValueObjects\Messages\Support\Document;
use Prism\Prism\ValueObjects\Messages\UserMessage;

class ChatProcessAction
{
    protected int $chatId;

    public function prepare(int $chatId): static
    {
        $this->chatId = $chatId;

        return $this;
    }

    public function handle(): void
    {
        $chat = Chat::query()
            ->with(['parser', 'parser.schema'])
            ->findOrFail($this->chatId);

        $medias = $chat->getMedia();

        $parser = $chat->parser;
        $schema = $parser->schema->toJsonSchema();

        $attachments = [];
        foreach ($medias as $media) {
            $path = $media->getPath();

            $attachments[] = Document::fromPath($path);
        }

        $messages = [new UserMessage($parser->user_prompt, $attachments)];

        $payload = [
            'schema' => $schema->toArray(),
            'system_prompt' => $parser->system_prompt,
            'user_prompt' => $parser->user_prompt,
            'attachments' => $attachments,
        ];

        $chat->update([
            'payload' => $payload,
        ]);

        $result = Prism::structured()
            ->using(Provider::Gemini, 'gemini-2.5-flash-preview-04-17')
            ->withClientOptions([
                'timeout' => 200,
            ])
            ->usingTemperature(0)
            ->withSchema($schema)
            ->withSystemPrompt($parser->system_prompt)
            ->withMessages($messages)
            ->generate()
            ->structured;

        $chat->update([
            'status' => ChatStatus::COMPLETED,
            'response_completed_at' => now(),
            'response' => $result,
        ]);
    }
}
