<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\UserRequest;

class RegisterController extends Controller
{
    /**
     * ユーザ登録処理
     *
     * @param   UserRequest    $request
     *  リクエスト
     *
     * @return  \Illuminate\Http\Response
     */
    public function register(UserRequest $request)
    {
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
