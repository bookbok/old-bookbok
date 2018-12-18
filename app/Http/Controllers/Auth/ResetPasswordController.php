<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

class ResetPasswordController extends Controller
{
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->middleware('throttle:6,1')->only('send', 'reset');
    }

    /**
     * パスワードリセットメール送信処理
     *
     * @param   Request    $request
     *  リクエスト
     * 
     * @return  \Illuminate\Http\Response
     */
    public function send(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        $response = Password::broker()->sendResetLink(
            $request->only('email')
        );

        return response()->json([
            'userMessage' => 'リセット用のリンクを送信しました。登録されているメールの確認をお願いします。',
        ], 200);
    }

    /**
     * パスワードリセット処理
     *
     * @param   Request    $request
     *  リクエスト
     * 
     * @return  \Illuminate\Http\Response
     */
    public function reset(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'token'    => 'required',
            'email'    => 'required|email|max:255',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }
   
        $response = Password::broker()->reset(
            // ここでpassword_confirmationを追加するのはPasswordBrokerでその値を使うから。
            // リクエストに含めないのはパスワードの入力チェックはクライアント側でやってもらいたいから。
            $request->only('token', 'email', 'password') + [
                'password_confirmation' => $request->all()['password'],
            ],
             // PasswordBroker::resetがClosureを求めているのでこうしている。
            \Closure::fromCallable([$this, 'resetPassword'])
        );

        if (Password::PASSWORD_RESET !== $response) {
            return response()->json([
                'status' => 400,
                'userMessage' => 'パスワードのリセットに失敗しました。',
            ], 400);
        }
        
        return response()->json([
            'userMessage' => 'パスワードの変更に成功しました。',
        ], 200);
    }

    /**
     * パスワードをリセットする
     * 
     * @param   \App\User   $user
     *  ユーザー
     * @param   string  $password
     *  パスワード
     * 
     * @return void
     */
    public function resetPassword(\App\User $user, string $password)
    {
        $user->password = password_hash($password, PASSWORD_DEFAULT);

        // これは必要ないけど念のため
        $user->setRememberToken(Str::random(60));

        // アクセストークンをすべて無効化
        foreach($user->tokens as $token) {
            $token->revoke();   
        }

        $user->save();

        event(new PasswordReset($user));
    }
}
