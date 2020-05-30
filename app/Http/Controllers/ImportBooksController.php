<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Book;
use App\Components\BookInfoScraper\ScrapeManager;
use App\Http\Requests\ImportBookRequest;

class ImportBooksController extends Controller
{

    /**
     * 書籍を一括登録するためのエンドポイント
     * カンマ区切りのISBN文字列が送られてくることを期待している
     *
     * @Request $request
     *  リクエスト情報をまとめているLaravel組込クラス
     */
    public function store(ImportBookRequest $request) {
        $authId = auth()->guard('api')->id();

        // リクエストデータのの取得
        $raw_isbn_array = $request->input('isbnList');

        // 正しいISBNの形式を守るデータのみを残すようにフィルタリング
        $filterd_isbn_array = array_filter($raw_isbn_array, ['App\Components\ISBN', 'normalizeReturnBoolean']);

        if(empty($filterd_isbn_array)){
            return response()->json(
                [
                    'status' => 400,
                    'userMessage' => '入力されたISBNは13桁の数字になっていますか？ご確認お願い致します。'
                ],
                400
            );
        }

        $bookNames = UserBook::registerUserBooks($filterd_isbn_array, $authId);

        if(empty($bookNames)){
            return response()->json(
                [
                    'status' => 200,
                    'userMessage' => 'リクエストされた本はすべて登録済みです。'
                ],
                200
            );
        }

        return response()->json(['books' => $bookNames], 201);
    }
}
