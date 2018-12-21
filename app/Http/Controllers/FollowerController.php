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
    public function followers($userId)
    {
        $followers = User::find($userId)->followers;

        return response()->json($followers, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * あるユーザーがフォローしている人の一覧を返す
     *
     * @return \Illuminate\Http\Response
     */
    public function followings($userId)
    {
        $followings = User::find($userId)->followings;

        return response()->json($followings, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
