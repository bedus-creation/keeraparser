<?php

namespace App\Jobs;

use App\Actions\ChatProcessAction;
use App\Constants\ChatStatus;
use App\Models\Chat;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ChatProcessJob implements ShouldQueue
{
    use Queueable;

    public function __construct(protected int $chatId) {}

    public function handle(ChatProcessAction $action): void
    {
        $action->prepare($this->chatId)->handle();
    }

    public function failed(\Exception $exception): void
    {
        Chat::query()
            ->find($this->chatId)
            ?->update([
                'status'                => ChatStatus::FAILED,
                'response_completed_at' => now(),
                'response'              => $exception->getMessage()
            ]);
    }
}
