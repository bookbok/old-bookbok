<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Lcobucci\JWT\Parser;

class AuthenticationController extends Controller
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
        $user = User::where('email', $request->email)->first();

        if (null === $user) {
            $response = 'User doesn\'t exist';
            return response($response, 422);
        }

        if (false === password_verify($request->password, $user->password)) {
            $response = 'Password mismatch';
            return response($response, 422);
        }

        $response = [
            'token' => $user->createToken(self::TOKEN_NAME)->accessToken
        ];

        return response($response, 200);
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

        $response = 'You have been successfully logged out!';

        return response($response, 200);
    }
}
