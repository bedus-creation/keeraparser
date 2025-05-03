<?php

namespace App\Actions;

use App\Data\ChatStoreDto;
use App\Jobs\ChatProcessJob;
use App\Models\Chat;
use App\Models\User;
use Cache;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class ChatInitiateAction
{
    protected User $user;

    protected ChatStoreDto $request;

    protected bool $processSync = false;

    public function processSync(): self
    {
        $this->processSync = true;

        return $this;
    }

    public function prepare(User $user, ChatStoreDto $request): static
    {
        $this->user    = $user;
        $this->request = $request;

        return $this;
    }


    /**
     * @return Chat
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function execute(): Chat
    {
        $lockKey = "monthly_limit_user_{$this->user->id}";
        $lock    = Cache::lock($lockKey, 3);

        try {
            $lock->block(5);

            $startOfMonth = now()->startOfMonth();
            $endOfMonth   = now()->endOfMonth();

            $requestCount = Chat::query()
                ->where('user_id', $this->user->id)
                ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->where('status', '!=', \App\Constants\ChatStatus::FAILED)
                ->count();

            if ($requestCount >= $this->user->getSubscriptionPlan()->getQuotaPerMonth()) {
                throw new ThrottleRequestsException("Monthly quota exceeded, Please upgrade your plan.");
            }

            /** @var Chat $chat */
            $chat = Chat::query()->create([
                'user_id'     => $this->user->id,
                'parser_id'   => $this->request->parserId,
            ]);

            $files = $this->request->files ?? [];

            foreach ($files as $file) {
                $chat->addMedia($file)->toMediaCollection();
            }
        } catch (LockTimeoutException $e) {
            throw new ThrottleRequestsException("Too many concurrent requests, please try again later.");
        } finally {
            $lock->release();
        }

        $this->processSync
            ? ChatProcessJob::dispatchSync($chat->id)
            : ChatProcessJob::dispatch($chat->id);

        return $chat;
    }
}
