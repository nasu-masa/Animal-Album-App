<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'type'         => $this->type,
            'file_path'    => Storage::disk('public')->url($this->file_path),
            'category'     => $this->category,
            'taken_at'     => $this->taken_at?->toIso8601String(),
            'memo'         => $this->memo,
            'user'         => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
            ],
            'is_favorited' => $this->whenLoaded('favorites', fn() => $this->favorites->isNotEmpty(), false),
        ];
    }
}
