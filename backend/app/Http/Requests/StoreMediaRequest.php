<?php

namespace App\Http\Requests;

use App\Enums\MediaCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file'     => ['required', 'file', 'mimetypes:image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/webm', 'max:102400'],
            'category' => ['required', 'string', Rule::in(MediaCategory::values())],
            'taken_at' => ['nullable', 'date'],
            'memo'     => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'file'     => 'ファイル',
            'category' => 'カテゴリ',
            'taken_at' => '撮影日',
            'memo'     => 'メモ',
        ];
    }
}
