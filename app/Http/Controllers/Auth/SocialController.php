<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Lcobucci\JWT\Parser;

class SocialController extends Controller
{
    /**
     * @var string[] プロバイダ名をキーとした、このクラスのメソッド名の連想配列
     * 
     * 登録されるコールバックは引数に文字列(アクセストークン)を取り、App\Userを返す。
     */
    private const PROVIDER_CALLBACK_LIST = [
        'google' => 'connectGoogle',
    ];

    /**
     * ログイン処理
     *
     * @param   Request $request
     *  リクエスト
     *
     * @return  \Illuminate\Http\Response
     */
    public function login(Request $request) {
        $validator = \Validator::make($request->all(), [
            'provider' => 'required|string',
            'token'    => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }
/*
        $user = User::where('email', $request->email)->first();

        if (
            null === $user ||
            false === password_verify($request->password, $user->password)
        ) {
            return response()->json([
                'status' => 422,
                'userMessage' => '認証に失敗しました。',
            ], 422);
        }
*/
        return response()->json([
            'token' => $user->createToken(self::TOKEN_NAME)->accessToken,
        ], 200);
    }

    /**
     * Googleユーザ認証処理
     */
    public function connectGoogle(string $token){

    }
}
