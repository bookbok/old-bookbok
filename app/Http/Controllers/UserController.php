<?php

namespace App\Http\Controllers;

use App\Models\User;

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
     * @param  \App\Models\User  $user
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
