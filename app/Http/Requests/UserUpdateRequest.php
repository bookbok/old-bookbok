<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserUpdateRequest extends FormRequest
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
        // HACK: ConvertEmptyStringsToNullミドルウェアによって空文字はnullに変換されてしまうためnullを許可
        return [
            'name'        => 'required|string|regex:/\A[^[:cntrl:]\s]+\z/u|min:1|max:32',
            'description' => 'nullable|string|max:1000',
            'avatar'      => 'nullable|string|active_url|max:1000',
        ];
    }

    public function withValidator($validator) {
        $validator->after(function ($validator) {
            // このコールバックはバリデーションが成功した場合に追加で呼ばれる
            $findUser = \App\User::where('name', $this->input('name'))->first();

            if(null !== $findUser && $this->user()->id !== $findUser->id){
                // 同名ユーザが存在して、認証ユーザと同名ユーザが同一でなければ使用不可
                $validator->errors()->add('name', '既に使用されています。');
            }
        });
    }

    protected function failedValidation(Validator $validator) {
        $res = response()->json([
            'status' => 400,
            'userMessage' => $validator->errors(),
        ], 400);

        throw new HttpResponseException($res);
    }
}
