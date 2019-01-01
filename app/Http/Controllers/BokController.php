<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Bok;
use App\Reaction;
use Carbon\Carbon;

class BokController extends Controller
{
    /**
     *  BOKSを返すAPI
     *
     * @param string $userBookId
     *   ユーザブックを一意に特定するID
     *
     * @return \Illuminate\Http\Response
     *   JSON形式でBOKSを返す
     */
    public function index($userBookId){

        // 指定されたuserBookIdが実在するかのチェック
        if(!UserBook::find($userBookId)){
            return response()->json(
                [
                    'status' => 404,
                    'userMessage' => 'お探しのユーザブックは見つかりませんでした。'
                ],
                404
            );
        }

        $authId = auth()->guard('api')->id();

        // 指定されたuserBookIdに紐づくBokを取得する
        $boks = Bok::with([
                'userBook.user:id,name',
                'userBook.book:id,isbn,cover',
            ])
            ->select(['id', 'user_id', 'user_book_id', 'page_num_begin', 'page_num_end', 'line_num', 'body', 'updated_at'])
            ->withCount([
                'reactions as liked_count' => function($q) {
                    $q->isLiked();
                },
                'reactions as loved_count' => function($q) {
                    $q->isLoved();
                },
                'reactions as liked' => function($q) use($authId) {
                    $q->isLiked()->where('user_id', $authId);
                },
                'reactions as loved' => function($q) use($authId) {
                    $q->isLoved()->where('user_id', $authId);
                }
            ])
            ->where('user_book_id', $userBookId)
            ->orderBy('page_num_begin')
            ->get();

        return response()->json($boks);
    }

    /**
     * Bokの作成、または更新をするAPI
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\UserBook  $userBookId
     * @return \Illuminate\Http\Response
     *   BokのインスタンスJSON
     */
    public function store(Request $request, UserBook $userBook)
    {
        $authId = auth()->guard('api')->id();
        if($authId != $userBook->user_id){
            return response()->json(
                [
                    'status' => 403,
                    'userMessage' => '自分以外の本棚に追加することはできません。'
                ],
                403
            );
        }

        $validator = \Validator::make($request->all(), [
            'body' => 'required|string|max:2048',
            'publish' => 'boolean',
            'page_num_begin' => 'integer',
            'page_num_end' => 'integer',
            'line_num' => 'integer',
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

        $bok = Bok::create(
            [
                'user_id' => $authId,
                'user_book_id' => $userBook->id,
                'body' => $request->body,
                'published_at' => $publishedAt,
                'page_num_begin' => $request->page_num_begin,
                'page_num_end' => $request->page_num_end,
                'line_num' => $request->line_num,
            ]
        );

        $bok = $bok->with([
                'userBook.user:id,name',
                'userBook.book:id,isbn,cover',
            ])
            ->withCount([
                'reactions as liked_count' => function($q) {
                    $q->isLiked();
                },
                'reactions as loved_count' => function($q) {
                    $q->isLoved();
                },
                'reactions as liked' => function($q) use($authId) {
                    $q->isLiked()->where('user_id', $authId);
                },
                'reactions as loved' => function($q) use($authId) {
                    $q->isLoved()->where('user_id', $authId);
                }
            ])
            ->find($bok->id);
        return response()->json($bok, 201);
    }
}
