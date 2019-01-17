<?php

namespace App\Http\Controllers\Auth;

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
        $validator = \Validator::make($request->all(), [
            'name'        => 'required|string|regex:/\A[^[:cntrl:]\s]+\z/u|min:1|max:32|unique:users',
            'description' => 'required|nullable|string|max:1000',
            'avatar'      => 'required|string|active_url|max:255',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        $user = $request->user();

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
