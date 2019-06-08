<?php

namespace App\Http\Controllers;

use App\Review;
use App\UserBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReviewController extends Controller
{
    public function __construct(){
      $this->middleware('can:create,App\Review,userBook')->only('store');
    }


    /**
     * Reviewの作成、または更新をするAPI
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     *   ReviewのインスタンスJSON
     */
    public function store(Request $request, UserBook $userBook)
    {
        $authId = auth()->guard('api')->id();

        $validator = \Validator::make($request->all(), [
            'title'   => 'required|string|max:100',
            'body'    => 'required|string|max:4048',
            'publish' => 'boolean',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        // 公開処理
        $publishedAt = null;
        if($request->publish) {
            $publishedAt = Carbon::now()->toDateTimeString();
        }

        $review = Review::updateOrCreate(
            [
                'user_id' => $authId,
                'user_book_id' => $userBook->id,
            ],
            [
                'title'        => $request->title,
                'body'         => $request->body,
                'published_at' => $publishedAt,
            ]
        );

        return response()->json($review);
    }
}
