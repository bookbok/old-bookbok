<?php

namespace App\Http\Controllers;

use App\Review;
use App\UserBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Requests\ReviewRequest;

class ReviewController extends Controller
{
    /**
     * Reviewの作成、または更新をするAPI
     *
     * @param  \App\Http\Requests\ReviewRequest  $request
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     *   ReviewのインスタンスJSON
     */
    public function store(ReviewRequest $request, UserBook $userBook)
    {
        // 公開処理
        $publishedAt = null;
        if($request->publish) {
            $publishedAt = Carbon::now()->toDateTimeString();
        }

        $review = Review::updateOrCreate(
            [
                'user_id'      => auth()->guard('api')->id(),
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
