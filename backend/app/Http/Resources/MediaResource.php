<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this->id,
            'type'      => $this->type,
            'file_path' => $this->file_path,
            'category'  => $this->category,
            'taken_at'  => $this->taken_at?->toIso8601String(),
            'memo'      => $this->memo,
            'user'      => [
                'id'   => $this->user->id,
                'name' => $this->user->name,
            ],
        ];
    }
}
