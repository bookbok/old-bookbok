<?php

namespace App\Http\Controllers;

use App\BookUser;
use App\User;
use App\Book;
use App\Components\BookInfoScraper\ScrapeManager;
use Illuminate\Http\Request;

class BookUserController extends Controller
{
    /**
     * 特定ユーザの本棚のなかに登録されている本の一覧情報を返す
     *
     * @param userId : ユーザID
     * @return JSON形式のユーザの本棚内一覧
     */
    public function index($userId)
    {

        $userBooks = User::with(['books' => function($q) {
                        $q->select('books.id','books.name', 'books.cover', 'books.author', 'books.genre_id');
                     }])
                     ->select('users.id', 'users.name', 'users.avatar', 'users.description', 'users.role_id')
                     ->find($userId);

        return response()->json(
            $userBooks,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * ユーザの本棚に本を追加する。
     *
     * @param  \Illuminate\Http\Request  $request
     * 　POSTメソッドで送られてくる。
     * 　ボディにはbook_id（本のISBN）が含まれている。
     * @param $userId
     * 　usersリソースを一意に特定するためのユーザID。
     * @param ScrapeManager $scrapers
     * 　外部APIを使用して本条を取得するScraperを管理するマネージャクラス。
     * 
     * @return \Illuminate\Http\Response
     * 　JSON形式で本情報をまとめて返す
     */
    public function store(Request $request, ScrapeManager $scrapers, $userId)
    {
        /**
         * 1.リクエストから入力取得
         * 2.パラメータをもとにDBにISBNに該当する本情報が格納されているか確認する
         * 3.格納されていれば、book_userテーブルにレコードを挿入する
         *   されていなければ、スクレイプマネージャに処理委譲し、戻りデータをbooksテーブルに格納後
         * 　先と同様に、book_userテーブルにレコードを挿入する
         * 4.レスポンスを返す* 
         */

        // 入力取得
        $isbn = $request->input('book_id');

        // booksテーブルに該当レコードが存在しているか確認する
        $book = Book::find($isbn);
        if($book == null){
        // 存在していなければ、ScrapeManagerに処理委譲。
        // 外部APIを使用しISBNに該当する本情報をBOOK型で受け取る
        $book = $scrapers->searchByIsbn($isbn);
        // すべてのScraperが情報取得に失敗した場合
        if($book == null){
            // なんかのエラー処理
            return null;
        }
        // booksテーブルに挿入する
        $book->save();
        }
        // book_userテーブルに挿入する
        $user_book = new BookUser;
        $user_id = (int)$userId;
        $book_id = (int)$isbn;
        $user_book->save();
        // レスポンスデータの生成
        $userBook = BookUser::with([
                    'user:id,name,avatar,description',
                    'book:id,name,description,cover,author,genre_id',
                    'review:id,user_id,book_user_id,body,published_at',
                    'boks:id,user_id,book_user_id,body,page_num_begin,page_num_end,published_at'
                    ])
                ->select(['id', 'user_id', 'book_id'])
                ->find($user_book->id);

        return response()->json(
            $userBook,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );

    }

    /**
     * 本棚に収められた本の詳細情報表示用API.
     *
     * @param  bookUserId: ユーザブックの主キー
     * @return JSON形式のまるっと情報
     */
    public function show($bookUserId)
    {
        $userBook = BookUser::with([
                        'user:id,name,avatar,description',
                        'review:id,user_id,book_user_id,body,published_at',
                        'boks:id,user_id,book_user_id,body,page_num_begin,page_num_end,published_at'
                        ])
                    ->select(['id', 'user_id', 'book_id'])
                    ->find($bookUserId);

        return response()->json(
            $userBook,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function edit(BookUser $userBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BookUser $userBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function destroy(BookUser $userBook)
    {
        //
    }
}
