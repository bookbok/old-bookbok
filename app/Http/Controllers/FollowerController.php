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
        $authId    = auth()->guard('api')->id();
        $followers = $user->followers(); // MEMO: プロパティへアクセスするとCollectionが返る

        if ($authId) {
            // もしログインしているのであればユーザが認証ユーザとどのようなフォロー関係なのか分かる情報を付与する
            User::addFollowInfo( // MEMO: ここでis_follower, is_followingを追加している
                User::addStdInfo( // MEMO: ここでuserの基本情報のselectを追加している。なぜならこれをしないとselectがフォロー情報のみとなるから
                    $followers->getBaseQuery()
                ),
                $authId
            );
        }

        return response()->json($followers->getResults());
    }

    /**
     * あるユーザーがフォローしている人の一覧を返す
     *
     * @return \Illuminate\Http\Response
     */
    public function followings(User $user)
    {
        $authId     = auth()->guard('api')->id();
        $followings = $user->followings(); // MEMO: プロパティへアクセスするとCollectionが返る

        if ($authId) {
            // もしログインしているのであればユーザが認証ユーザとどのようなフォロー関係なのか分かる情報を付与する
            User::addFollowInfo( // MEMO: ここでis_follower, is_followingを追加している
                User::addStdInfo( // MEMO: ここでuserの基本情報のselectを追加している。なぜならこれをしないとselectがフォロー情報のみとなるから
                    $followings->getBaseQuery()
                ),
                $authId
            );
        }

        return response()->json($followings->getResults());
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
                400
            );
        }

        Follower::firstOrCreate(['user_id' => $authId, 'target_id' => $request->user_id]);
        return response()->json([]);
    }

    public function unFollow($userId, $targetId)
    {
        // URLとリクエストされたuserの正当性チェック
        $authId = auth()->guard('api')->id();
        if($authId != $userId){
            return response()->json(
                [
                    'status' => 403,
                    'userMessage' => 'リクエスト権限がありません'
                ],
                403
            );
        }

        Follower::where('user_id', $userId)->where('target_id', $targetId)->delete();
        return response()->json([], 200);
    }
}
