<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
        }

        $users = DB::table('users')
            ->leftJoin('followers', 'users.id', '=', 'followers.user_id')
            ->select('users.id', 'users.name', 'users.avatar', 'users.description', 'users.created_at', 'users.updated_at', 'users.role_id')
            ->selectRaw('(select count(*) from followers where target_id = users.id) as follower_count')
            ->selectRaw('(select count(*) from followers where user_id = users.id) as following_count')
            // ログインユーザーがフォローしているか？
            ->selectRaw('(select count(*) from followers where user_id = ? and target_id = users.id) as followingd', [$authId])
            // ログインユーザーがフォローされているか？
            ->selectRaw('(select count(*) from followers where user_id = users.id and target_id = ?) as followerd', [$authId])
            ->get();

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

        $user = DB::table('users')
            ->leftJoin('followers', 'users.id', '=', 'followers.user_id')
            ->select('users.id', 'users.name', 'users.avatar', 'users.description', 'users.created_at', 'users.updated_at', 'users.role_id')
            ->selectRaw('(select count(*) from followers where target_id = users.id) as follower_count')
            ->selectRaw('(select count(*) from followers where user_id = users.id) as following_count')
            // ログインユーザーがフォローしているか？
            ->selectRaw('(select count(*) from followers where user_id = ? and target_id = users.id) as followingd', [$authId])
            // ログインユーザーがフォローされているか？
            ->selectRaw('(select count(*) from followers where user_id = users.id and target_id = ?) as followerd', [$authId])
            ->where('users.id', '=', $userId)
            ->first();

        return response()->json($user, 200, [], JSON_UNESCAPED_UNICODE);
    }
}
