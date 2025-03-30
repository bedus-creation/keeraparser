<?php

namespace App\Actions;

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
        $chat = \App\Models\Chat::query()
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

        $result = Prism::structured()
            ->using(Provider::Gemini, 'gemini-2.0-flash')
            ->withSystemPrompt($parser->system_prompt)
            ->withSchema($schema)
            ->withMessages($messages)
            ->generate()
            ->structured;

        $chat->update([
            'response_completed_at' => now(),
            'response'              => $result,
        ]);
    }
}
