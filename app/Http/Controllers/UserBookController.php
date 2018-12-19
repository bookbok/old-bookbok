<?php

namespace App\Http\Controllers;

use App\UserBook;
use App\User;
use App\Book;
use App\Components\BookInfoScraper\ScrapeManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserBookController extends Controller
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
                $q->select('books.id','books.isbn','books.name', 'books.cover', 'books.author', 'books.genre_id');
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
     * ユーザの本棚に本を追加する。
     *
     * @param  \Illuminate\Http\Request  $request
     * 　POSTメソッドで送られてくる。
     * 　ボディにはbook_id（本のISBN）が含まれている。
     * @param $userId
     * 　usersリソースを一意に特定するためのユーザID。
     *
     * @return \Illuminate\Http\Response
     * 　JSON形式で本情報をまとめて返す
     */
    public function store(Request $request, $userId)
    {
        // 認可チェック
        $authId = Auth::id();
        if($authId != $userId){
            return response()->json([
                'status' => 403,
                'userMessage' => '自分以外の本棚に追加することはできません。'],
                403,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }

        // 入力取得
        $isbn = $request->input('isbn');
        
        // ScrapeManagerの生成
        $scrapers = resolve('app.bookInfo.scrapeManager');
        
        // booksテーブルに該当レコードが存在しているか確認する
        $book = Book::where('isbn', $isbn)->first();
        if($book == null){
            // 存在していなければ、ScrapeManagerに処理委譲。
            // 外部APIを使用しISBNに該当する本情報をBOOK型で受け取る
            $new_book = $scrapers->searchByIsbn((string)$isbn);
            // すべてのScraperが情報取得に失敗した場合
            if($new_book == null){
                return response()->json([
                        'status' => 500,
                        'userMessage' => 'お探しの本の情報を取得することができませんでした。'],
                        500,
                        [],
                        JSON_UNESCAPED_UNICODE
                    );
            }
            // booksテーブルに挿入する
            $new_book->save();
        }

        // 当該ユーザのuser_bookテーブルに同じ本がすでに登録されているかのチェック
        $is_userBook_exists = UserBook::where('book_id', $book->id)->where('user_id', $userId)->first();
        if($is_userBook_exists){
            return response()->json([
                'status' => 400,
                'userMessage' => '追加しようとした本はすでに本棚に登録されています。'],
                400,
                [],
                JSON_UNESCAPED_UNICODE);
        }

        // user_bookテーブルに挿入する
        $user_book = new UserBook;
        $user_book->user_id = auth()->id();
        $user_book->book_id = $book ? $book->id : $new_book->id;
        $user_book->save();
        // レスポンスデータの生成
        $userBook = UserBook::with([
            'user:id,name,avatar,description',
            'book:id,isbn,name,description,cover,author,genre_id',
            'review:id,user_id,user_book_id,body,published_at',
            'boks:id,user_id,user_book_id,body,page_num_begin,page_num_end,published_at'
            ])
            ->select(['id', 'user_id', 'book_id'])
            ->find($user_book->id);

        return response()->json(
            $userBook,
            201,
            [],
            JSON_UNESCAPED_UNICODE
        );

    }

    /**
     * 本棚に収められた本の詳細情報表示用API.
     *
     * @param  userId: ユーザの主キー
     * @param  userBookId: ユーザブックの主キー
     * @return JSON形式のまるっと情報
     */
    public function show($userId, $userBookId)
    {
        $authId = Auth::id();
        if($authId === null) {
            $authId = 0;
        }

        $userBook = UserBook::with([
                'user:id,name,avatar,description',
                'book:id,isbn,name,cover,description',
                'review:id,user_id,user_book_id,body,published_at',
                'boks',
                'boks' => function($q1) use($authId) {
                    $q1->withCount([
                        'reactions as liked_count' => function($q2) {
                            $q2->isLiked();
                        },
                        'reactions as loved_count' => function($q2) {
                            $q2->isLoved();
                        },
                        'reactions as liked' => function($q2) use($authId) {
                            $q2->isLiked()->where('user_id', $authId);
                        },
                        'reactions as loved' => function($q2) use($authId) {
                            $q2->isLoved()->where('user_id', $authId);
                        },
                    ]);
                },
                'boks.userBook:id,user_id,book_id',
                'boks.userBook.book:id,name,cover',
                'boks.userBook.user:id,name,avatar',
            ])
            ->select(['id', 'user_id', 'book_id', 'reading_status'])
            ->where('id', $userBookId)
            ->where('user_id', $userId)
            ->take(1)->first();

        return response()->json(
            $userBook,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
