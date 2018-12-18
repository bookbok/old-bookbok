<?php

namespace App\Http\Controllers\Auth;

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
     * 
     * @return  \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        if (
            $request->user()->getKey() !== (int) $request->route('id')
            || !$request->user()->markEmailAsVerified()
        ) {
            return response()->json([
                'status' => 400,
                'userMessage' => '有効化に失敗しました。'
            ], 400);
        }

        event(new Verified($request->user()));

        return response()->json([
            'userMessage' => '有効化に成功しました。',
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
                'userMessage' => '有効化に成功しました。',
            ], 200);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'userMessage' => '検証メールを再送信しました。確認をお願いします。',
        ], 200);
    }
}
