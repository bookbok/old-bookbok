<?php

namespace App\Http\Controllers;

use App\Models\UserBook;
use App\Models\Bok;
use Carbon\Carbon;
use App\Http\Requests\BokRequest;

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
                    'userMessage' => 'お探しのユーザブックは見つかりませんでした。',
                ],
                404
            );
        }

        // 指定されたuserBookIdに紐づくBokを取得する
        $boks = Bok::with([
                'userBook.user:id,name',
                'userBook.book:id,isbn,cover',
            ])
            ->where('user_book_id', $userBookId)
            ->orderBy('page_num_begin')
            ->get();

        return response()->json($boks);
    }

    /**
     * Bokの作成、または更新をするAPI
     *
     * @param  \Illuminate\Http\Requests\BokRequest  $request
     * @param  \App\UserBook  $userBook
     * @return \Illuminate\Http\Response
     *   BokのインスタンスJSON
     */
    public function store(BokRequest $request, UserBook $userBook)
    {
        $authId = auth()->guard('api')->id();

        $publishedAt = $request->publish ? Carbon::now()->toDateTimeString() : null;

        $bok = Bok::create([
            'user_id' => $authId,
            'user_book_id' => $userBook->id,
            'body' => $request->body,
            'published_at' => $publishedAt,
            'page_num_begin' => $request->page_num_begin,
            'page_num_end' => $request->page_num_end,
            'line_num' => $request->line_num,
        ]);

        $bok = $bok->with([
                'userBook.user:id,name',
                'userBook.book:id,isbn,cover',
            ])
            ->find($bok->id);
        return response()->json($bok, 201);
    }

    /**
     * Bokを削除するAPI
     *
     * @Bok $bok
     */
    public function delete(Bok $bok){
        $bok->delete();

        return response()->json(
            [
                'status' => 200,
                'userMessage' => '削除しました。',
            ],
            200
        );
    }
}
