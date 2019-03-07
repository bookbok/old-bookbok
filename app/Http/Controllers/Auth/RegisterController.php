<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    /**
     * ユーザ登録処理
     *
     * @param   Request    $request
     *  リクエスト
     *
     * @return  \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name'     => 'required|string|regex:/\A[^[:cntrl:]\s]+\z/u|min:1|max:32|unique:users',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        $data = $request->all();
        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => password_hash($data['password'], PASSWORD_DEFAULT),
        ]);

        event(new Registered($user));

        return response()->json([
            'userMessage' => 'ユーザ登録に成功しました。ログインしましょう！',
        ], 200);
    }
}
