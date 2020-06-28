<?php

namespace App\Http\Controllers;

use App\Models\Reaction;
use App\Models\User;

class ReactionController extends Controller
{
    /**
     * User likes & loves resources
     */

    public function userLikes($userId)
    {
        $likes = User::find($userId)->likes();
        return response()->json($likes);
    }

    public function userLoves($userId)
    {
        $loves = User::find($userId)->loves();
        return response()->json($loves);
    }

    /**
     * Bok likes resources
     */

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

        return response()->json([]);
    }

    public function deleteLike($bokId)
    {
        $authId = auth()->guard('api')->id();
        $reaction = Reaction::whereFromForeignKeys($authId, $bokId)->first();
        if($reaction != null) {
            $reaction->liked = false;
            $reaction->save();
        }

        return response()->json([]);
    }

    /**
     * Bok loves resources
     */

    public function storeLove($bokId)
    {
        $authId = auth()->guard('api')->id();
        Reaction::updateOrCreate([
            'bok_id' => $bokId,
            'user_id' => $authId,
        ],
        [
            'loved' => true,
        ]);

        return response()->json([]);
    }

    public function deleteLove($bokId)
    {
        $authId = auth()->guard('api')->id();
        $reaction = Reaction::whereFromForeignKeys($authId, $bokId)->first();
        if($reaction != null) {
            $reaction->loved = false;
            $reaction->save();
        }

        return response()->json([]);
    }
}
