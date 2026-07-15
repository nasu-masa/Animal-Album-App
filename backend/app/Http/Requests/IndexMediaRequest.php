<?php

namespace App\Http\Requests;

use App\Enums\MediaCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => ['nullable', 'string', Rule::in(MediaCategory::values())],
            'type'     => ['nullable', 'in:image,video'],
            'sort'     => ['nullable', 'in:asc,desc'],
            'page'     => ['nullable', 'integer', 'min:1'],
        ];
    }
}
