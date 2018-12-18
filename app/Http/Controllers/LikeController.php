<?php

namespace App\Http\Controllers;

use App\Like;
use App\User;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $likes = User::find($userId)->likes;
        return response()->json(
            $likes,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
