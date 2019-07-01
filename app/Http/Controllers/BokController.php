<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Bok;
use App\User;
use App\Reaction;
use Carbon\Carbon;
use App\Http\Requests\BokRequest;

class BokController extends Controller
{
    public function __construct(){
      $this->middleware('can:create,App\Bok,userBook')->only('store');
      $this->middleware('can:delete,bok')->only('delete');
    }

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

        $authId = auth()->guard('api')->id();

        // 指定されたuserBookIdに紐づくBokを取得する
        $boks = Bok::with([
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
