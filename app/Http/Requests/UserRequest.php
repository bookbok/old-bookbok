<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
            'name'     => 'required|string|regex:/\A[^[:cntrl:]\s]+\z/u|min:1|max:32|unique:users',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
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
