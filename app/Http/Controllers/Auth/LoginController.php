<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;
use App\Http\Requests\LoginRequest;

class LoginController extends Controller
{
    private const TOKEN_NAME = 'Laravel Password Grant Client';

    /**
     * ログイン処理
     *
     * @param   LoginRequest $request
     *  リクエスト
     *
     * @return  \Illuminate\Http\Response
     */
    public function login(LoginRequest $request) {
        $user = User::whereEmail($request->email)->first();

        if (
            null === $user ||
            false === password_verify($request->password, $user->password) ||
            !$user->hasVerifiedEmail()
        ) {
            return response()->json([
                'status' => 422,
                'userMessage' => '認証に失敗しました。',
            ], 422);
        }

        return response()->json([
            'token' => $user->createToken(self::TOKEN_NAME)->accessToken,
        ], 200);
    }

    /**
     * ログアウト処理
     *
     * @param   Request $request
     *  リクエスト
     *
     * @return  \Illuminate\Http\Response
     */
    public function logout(Request $request) {
        $value = $request->bearerToken();
        $id    = (new Parser())->parse($value)->getHeader('jti');
        $token = $request->user()->tokens->find($id);

        $token->revoke();

        return response()->json([
            'userMessage' => 'ログアウトしました。',
        ], 200);
    }
}
