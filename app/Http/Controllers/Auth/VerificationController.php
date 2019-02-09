<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\VerifiesEmails;

class VerificationController extends Controller
{
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /**
     * メールアドレス検証処理
     * 
     * @param   Request    $request
     *  リクエスト
     * @param   User    $user
     *  ルートパラメータから取得したユーザ
     * 
     * @return  \Illuminate\Http\Response
     */
    public function verify(Request $request, User $user)
    {
        if (!$user->markEmailAsVerified()) {
            return response()->json([
                'status' => 400,
                'userMessage' => '検証に失敗しました。'
            ], 400);
        }

        event(new Verified($request->user()));

        return response()->json([
            'userMessage' => '検証に成功しました。',
        ], 200);
    }

    /**
     * メールアドレス検証メール再送処理
     * 
     * @param   Request    $request
     *  リクエスト
     * 
     * @return  \Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'status' => 400,
                'userMessage' => 'すでに検証されています。',
            ], 400);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'userMessage' => '送信しました。',
        ], 200);
    }
}
