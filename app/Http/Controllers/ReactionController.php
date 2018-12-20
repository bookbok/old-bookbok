<?php

namespace App\Http\Controllers;

use App\Reaction;
use App\User;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    /**
     * User likes & loves resources
     */

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

        return response()->json([], 200);
    }

    public function deleteLike($bokId)
    {
        $authId = auth()->guard('api')->id();
        $reaction = Reaction::where('bok_id', $bokId)->where('user_id', $authId)->get()->first();
        if($reaction != null) {
            $reaction->liked = false;
            $reaction->save();
        }

        return response()->json([], 200);
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

        return response()->json([], 200);
    }

    public function deleteLove($bokId)
    {
        $authId = auth()->guard('api')->id();
        $reaction = Reaction::where('bok_id', $bokId)->where('user_id', $authId)->get()->first();
        if($reaction != null) {
            $reaction->loved = false;
            $reaction->save();
        }

        return response()->json([], 200);
    }
}
