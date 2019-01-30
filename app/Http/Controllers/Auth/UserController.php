<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * ユーザ情報
     *
     * @param   Request  $request
     *  リクエスト
     * 
     * @return  \App\User
     */
    public function show(Request $request)
    {
        return $request->user()->makeVisible([
            'email',
            'email_verified_at',
        ]);
    }

    /**
     * ユーザー情報更新
     * 
     * @param   Request $request
     *  リクエスト
     * 
     * @return  \App\User
     */
    public function update(Request $request)
    {
        $user      = $request->user();
        $validator = \Validator::make($request->all(), [
            'name'        => 'required|string|regex:/\A[^[:cntrl:]\s]+\z/u|min:1|max:32',
            'description' => 'required|nullable|string|max:1000',
            'avatar'      => 'required|string|active_url|max:1000',
        ]);

        $validator->after(function ($validator) use ($user, $request) {
            // このコールバックはバリデーションが成功した場合に追加で呼ばれる
            $findUser = \App\User::where('name', $request->name)->first();

            if(null !== $findUser && $user->id !== $findUser->id){
                // 同名ユーザが存在して、認証ユーザと同名ユーザが同一でなければ使用不可
                $validator->errors()->add('name', '既に使用されています。');
            }
        });

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        $user->name        = $request->name;
        $user->description = $request->description;
        $user->avatar      = $request->avatar;

        $user->save();

        return $user->makeVisible([
            'email',
            'email_verified_at',
        ]);
    }
}
