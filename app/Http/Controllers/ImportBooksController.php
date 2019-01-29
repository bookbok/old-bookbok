<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UserBook;
use App\Book;
use App\Components\BookInfoScraper\ScrapeManager;

class ImportBooksController extends Controller
{

    /**
     * 書籍を一括登録するためのエンドポイント
     * カンマ区切りのISBN文字列が送られてくることを期待している
     *
     * @Request $request
     *  リクエスト情報をまとめているLaravel組込クラス
     */
    public function store(Request $request){

        $validator = \Validator::make($request->all(), [
            'isbnList' => 'required|string',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

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

        //　ユーザの本棚に登録されている本と重複しないかをチェックして
        //　問題なければユーザの本棚に新規登録する
        foreach($filterd_isbn_array as $isbn){

            // App\Bookに存在しているか確認
            if(Book::where('isbn', '=', $isbn)->exists()){

                $book = Book::where('isbn', '=', $isbn)->first();

                // App\UserBookに存在しているか確認
                if(UserBook::where('user_id', '=', $authId)->where('book_id', '=', $book->id)->exists())continue;

                // ユーザの本棚に登録
                UserBook::create([
                    'user_id' => $authId,
                    'book_id' => $book->id
                ]);

                $response[] = $book->name;

                continue;
            }

            // App\Bookに存在していない場合
            // ScrapeManagerを使って本情報を取得してからBookとUserBook双方の登録を行う
            $scrapers = resolve('app.bookInfo.scrapeManager');

            // すでにISBN文字列の正規化は行っているので例外（\InvalidArgumentException）を考慮しない
            $new_book = $scrapers->searchByIsbn($isbn);
            if($new_book == null){
               continue;
            }

            // App\Bookの保存
            $new_book->save();

            // App\UserBookの保存
            UserBook::create([
                'user_id' => $authId,
                'book_id' => $new_book->id
            ]);

            $response[] = $new_book->name;
        }

        if(empty($response)){
            return response()->json(
                [
                    'status' => 200,
                    'userMessage' => 'リクエストされた本はすべて登録済みです。'
                ],
                200
            );
        }

        return response()->json(["books" => $response],201);
    }
}
