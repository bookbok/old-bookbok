<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $authId = getAuthIdOrZero();
        $users = User::withFollowInfo($authId)->get();
        return response()->json($users);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $authId = getAuthIdOrZero();
        $user = User::withFollowInfo($authId)
            ->where('users.id', '=', $userId)
            ->first();

        return response()->json($user);
    }
}
