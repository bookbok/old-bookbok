<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Follower;
use App\Bok;

class BokFlowController extends Controller
{
    /**
     * ユーザがフォローしているユーザのBokを時系列順に並べて返すAPI
     * 
     * 
     * @return @return  \Illuminate\Http\Response
     *   JSON形式のBokフローデータ
     */
    public function index(){

        //ログインしているユーザのID取得
        $userId = Auth::id();
        if(!$userId){
            return response()->json(
                [],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }

        //フォローしているユーザを取得
        $followers = Follower::where('user_id', $userId)->get();
        
        //フォローが0人の場合は空配列を返す
        if($followers->isEmpty()){
            return response()->json(
                [],
                200,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }

        //フォローしているユーザのidを配列にパースする
        foreach($followers as $follower){
            $ids[] = $follower->target_id;
        }

        //BokFlowデータの取得
        $bokFlow = Bok::with([
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
        ->whereIn('user_id', $ids)
        ->orderBy('updated_at', 'desc')
        ->get();

        return response()->json(
            $bokFlow,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );

    }
}
