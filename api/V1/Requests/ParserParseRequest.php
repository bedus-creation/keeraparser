<?php

namespace Api\V1\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ParserParseRequest extends FormRequest
{
    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'files'    => [
                'required',
                'array',
            ],
            'files.*'  => [
                Rule::file()
                    ->types('pdf,docx')
            ],
            'params'   => ['array'],
            'params.*' => 'required'
        ];
    }
}
