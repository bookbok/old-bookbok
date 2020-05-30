<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function __construct(){
        $this->middleware('can:create,App\Follower,user')->only('follow');
        $this->middleware('can:delete,App\Follower,user')->only('unFollow');
    }

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
     * @param $user
     *
     * @return \Illuminate\Http\Response
     */
    public function follow(Request $request, User $user)
    {
        // URLとリクエストされたuserの正当性チェック
        $authId = auth()->guard('api')->id();
        if(!User::where('id', $request->user_id)->exists()){
            return response()->json(
                [
                    'status' => 400,
                    'userMessage' => 'フォロー先のユーザーが存在しません。'
                ],
                400
            );
        }

        Follower::firstOrCreate(['user_id' => $authId, 'target_id' => $request->user_id]);
        return response()->json([]);
    }

    public function unFollow(User $user, User $targetUser)
    {
        Follower::where('user_id', $user->id)->where('target_id', $targetUser->id)->delete();
        return response()->json([], 200);
    }
}
