<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ChatProcessJob implements ShouldQueue
{
    use Queueable;

    public function __construct(protected int $chatId) {}

    public function handle() {
        // Write a prompt
        // Process actions
    }
}
