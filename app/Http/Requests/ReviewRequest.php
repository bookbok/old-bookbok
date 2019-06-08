<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'   => 'required|string|max:100',
            'body'    => 'required|string|max:4048',
            'publish' => 'boolean',
        ];
    }

    protected function failedValidation(Validator $validator) {
        $res = response()->json([
            'status' => 400,
            'userMessage' => $validator->errors(),
        ], 400);

        throw new HttpResponseException($res);
    }
}
