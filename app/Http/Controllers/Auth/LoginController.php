<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;

class LoginController extends Controller
{
    private const TOKEN_NAME = 'Laravel Password Grant Client';

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
            'email'    => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();

        if (
            null === $user ||
            false === password_verify($request->password, $user->password)
        ) {
            return response()->json([
                'userMessage' => 'Falid to authentication...',
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
            'userMessage' => 'You have been successfully logged out!',
        ], 200);
    }
}
