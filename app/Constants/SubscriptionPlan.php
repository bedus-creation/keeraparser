<?php

namespace App\Constants;

enum SubscriptionPlan: string
{
    case FREE = 'free';
    case STARTER = 'starter';
    case PRO = 'pro';

    public function getQuotaPerMonth(): int
    {
        return match ($this) {
            self::FREE => 50,
            self::STARTER => 500,
            self::PRO => 5000,
        };
    }

    public function getPricePerMonth(): int
    {
        return match ($this) {
            self::FREE => 0,
            self::STARTER => 19.99,
            self::PRO => 99.99,
        };
    }

    public function getWebRateLimitPerMinute(): int
    {
        // For now 60 requests per minute is sufficient for all kinds of users.
        return match ($this) {
            self::FREE, self::STARTER, self::PRO => 60,
        };
    }

    public function getAPIRateLimitPerMinute(): int
    {
        // For now 60 requests per minute is sufficient for all kinds of users.
        return match ($this) {
            self::FREE, self::STARTER, self::PRO => 60,
        };
    }
}
