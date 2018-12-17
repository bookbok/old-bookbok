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
                'message' => 'Verification failed...'
            ], 400);
        }

        event(new Verified($request->user()));

        return response()->json([
            'message' => 'Your email has been successfully verified!',
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
                'message' => 'Your email has been successfully verified!',
            ], 200);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'We successfully retransmitted the verification email.',
        ], 200);
    }
}
