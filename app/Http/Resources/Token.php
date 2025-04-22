<?php

namespace App\Http\Resources;

use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * @mixin PersonalAccessToken
 */
class Token extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'name'         => $this->name,
            'created_at'   => $this->created_at->format('Y-m-d'),
            'token'        => Str::of($this->getKey().'|...'),
            'last_used_at' => $this->last_used_at?->format('Y-m-d'),
            'expires_at'   => $this->expires_at?->format('Y-m-d'),
        ];
    }
}
