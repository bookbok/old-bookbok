<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Bok;
use App\Reaction;

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
                [],
                404,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
        //userIdの取得
        $userId = UserBook::find($userBookId)->user_id;

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
                'reactions as liked' => function($q) use($userId) {
                    $q->isLiked()->where('user_id', $userId);
                },
                'reactions as loved' => function($q) use($userId) {
                    $q->isLoved()->where('user_id', $userId);
                }
            ])
            ->where('user_book_id', $userBookId)
            ->orderBy('page_num_begin')
            ->get();

        return response()->json(
            $boks,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Bokの作成、または更新をするAPI
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $userBookId
     * @return \Illuminate\Http\Response
     *   BokのインスタンスJSON
     */
    public function store(Request $request, $userBookId)
    {
        $validator = \Validator::make($request->all(), [
            'body' => 'required|string|max:2048',
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

        $bok = Bok::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'user_book_id' => $userBookId,
            ],
            [
                'body' => $request->body,
                'published_at' => $publishedAt,
            ]
        );

        return response()->json($bok, 200);
    }
}
