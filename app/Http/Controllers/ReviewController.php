<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Reviewの作成、または更新をするAPI
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userBookId
     * @return \Illuminate\Http\Response
     *   ReviewのインスタンスJSON
     */
    public function store(Request $request, $userBookId)
    {
        $validator = \Validator::make($request->all(), [
            'body' => 'required|string|max:4048',
            'publish' => 'boolean',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // 公開処理
        $publishedAt = null;
        if($request->publish) {
            $publishedAt = Carbon::now()->toDateTimeString();
        }

        $review = Review::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'user_book_id' => $userBookId,
            ],
            [
                'body' => $request->body,
                'published_at' => $publishedAt,
            ]
        );

        return response()->json($review, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        //
    }
}
