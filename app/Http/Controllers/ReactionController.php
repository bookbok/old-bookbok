<?php

namespace App\Http\Controllers;

use App\Reaction;
use App\User;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function likes($userId)
    {
        $likes = User::find($userId)->likes();
        return response()->json(
            $likes,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function storeLike($bokId)
    {
        $authId = auth()->guard('api')->id();
        Reaction::create([
            'bok_id' => $bokId,
            'user_id' => $authId,
            'liked' => true,
        ]);
    }

    public function loves($userId)
    {
        $loves = User::find($userId)->loves();
        return response()->json(
            $loves,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

}
