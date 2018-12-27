<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
        }

        $user = User::withCount([
            'followers as follower_count' => function($q) use($userId) {
                $q->where('target_id', $userId);
            },
            'followers as following_count' => function($q) use($userId) {
                $q->where('user_id', $userId);
            },
            'followers as followed' => function($q) use($userId, $authId) {
                $q->where('target_id', $authId)->where('user_id', $userId);
            },
            'followers as followinged' => function($q) use($userId, $authId) {
                $q->where('user_id', $authId)->where('target_id', $userId);
            },
        ])->find($userId);
        return response()->json($user, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
