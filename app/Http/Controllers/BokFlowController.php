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
    public function index() {
        $authId = auth()->guard('api')->id();
        if(!$authId){
            return response()->json(
                [
                    'status' => 401,
                    'userMessage' => 'Bokフローの閲覧にはログインが必要です。'
                ],
                401
            );
        }

        //フォローしているユーザを取得
        $followers = Follower::where('user_id', $authId)->get();
        //フォローが0人の場合は空配列を返す
        if($followers->isEmpty()){
            return response()->json([]);
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
        ->whereIn('user_id', $ids)
        ->orderBy('updated_at', 'desc')
        ->get();

        return response()->json($bokFlow);
    }
}
