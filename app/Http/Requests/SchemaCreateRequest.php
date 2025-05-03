<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchemaCreateRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        $this->merge([
            'schema_id' => $this->input('parent_id'),
        ]);
    }

    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'schema_id' => 'nullable|integer',
        ];
    }
}
