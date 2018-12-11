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
}
