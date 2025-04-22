<?php

namespace App\Models;

use Carbon\Carbon;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

/**
 * @property-read int     $id
 * @property-read  Carbon $created_at
 * @property-read  Carbon $expires_at
 * @property-read Carbon $last_used_at
 */
class PersonalAccessToken extends SanctumPersonalAccessToken
{
}
