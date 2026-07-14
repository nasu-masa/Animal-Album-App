<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'category' => ['required', 'string', 'in:cat,dog,bird,rabbit,hamster,fish,reptile,other'],
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
