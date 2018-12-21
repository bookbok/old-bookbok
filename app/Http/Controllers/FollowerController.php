<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * あるユーザーをフォローしている人の一覧を返す
     *
     * @return \Illuminate\Http\Response
     */
    public function followers(User $user)
    {
        $followers = $user->followers;

        return response()->json($followers, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * あるユーザーがフォローしている人の一覧を返す
     *
     * @return \Illuminate\Http\Response
     */
    public function followings(User $user)
    {
        $followings = $user->followings;

        return response()->json($followings, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * ユーザーをフォローする
     *
     * @param  \Illuminate\Http\Request  $request
     * @param $userId
     *
     * @return \Illuminate\Http\Response
     */
    public function follow(Request $request, $userId)
    {
        // URLとリクエストされたuserの正当性チェック
        $authId = auth()->guard('api')->id();
        if($authId != $userId || !User::where('id', $request->user_id)->exists()){
            return response()->json(
                [
                    'status' => 400,
                    'userMessage' => 'リクエストが不正です。'
                ],
                400,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }

        Follower::firstOrCreate(['user_id' => $authId, 'target_id' => $request->user_id]);
        return response()->json([], 200);
    }

}
