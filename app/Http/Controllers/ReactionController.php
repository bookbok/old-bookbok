<?php

namespace App\Http\Controllers;

use App\Reaction;
use App\User;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function userLikes($userId)
    {
        $likes = User::find($userId)->likes();
        return response()->json(
            $likes,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function userLoves($userId)
    {
        $loves = User::find($userId)->loves();
        return response()->json(
            $loves,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function storeLike($bokId)
    {
        $authId = auth()->guard('api')->id();
        Reaction::updateOrCreate([
            'bok_id' => $bokId,
            'user_id' => $authId,
        ],
        [
            'liked' => true,
        ]);

        return response()->json([], 200);
    }

    public function storeLoves($bokId)
    {
        $authId = auth()->guard('api')->id();
        Reaction::updateOrCreate([
            'bok_id' => $bokId,
            'user_id' => $authId,
        ],
        [
            'loved' => true,
        ]);

        return response()->json([], 200);
    }
}
