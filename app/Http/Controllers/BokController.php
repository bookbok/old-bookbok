<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Bok;
use App\Reaction;

class BokController extends Controller
{
    /**
     *  BOKフローを返すAPI
     * 
     * @param string $userBookId
     *   ユーザブックを一意に特定するID
     * 
     * @return \Illuminate\Http\Response
     *   JSON形式でBOKフローを返す
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

        // 指定されたuserBookIdに紐づくBokを取得する
        $boks = Bok::with([
                'userBook.user:id,name',
                'userBook.book:id,isbn',
            ])
            ->select(['id', 'user_id', 'user_book_id', 'page_num_begin', 'page_num_end', 'line_num', 'body', 'updated_at'])
            ->withCount([
                'reactions as liked_count' => function($q2) {
                    $q2->where('liked', true);
                },
                'reactions as loved_count' => function($q2) {
                    $q2->where('loved', true);
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
}