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
}
