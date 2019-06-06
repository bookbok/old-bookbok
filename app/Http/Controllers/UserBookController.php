<?php

namespace App\Http\Controllers;

use App\UserBook;
use App\User;
use App\Book;
use App\Genre;
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

        return response()->json($userBooks);
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
        $authId = auth()->guard('api')->id();
        if($authId != $userId){
            return response()->json(
                [
                    'status' => 403,
                    'userMessage' => '自分以外の本棚に追加することはできません。'
                ],
                403
            );
        }

        // 入力取得
        $isbn = $request->input('isbn');

        // ScrapeManagerの生成
        $scrapers = resolve('app.bookInfo.scrapeManager');

        // booksテーブルに該当レコードが存在しているか確認する
        $book = Book::where('isbn', $isbn)->first();
        if($book == null){
            try {
                // 存在していなければ、ScrapeManagerに処理委譲。
                // 外部APIを使用しISBNに該当する本情報をBOOK型で受け取る
                $new_book = $scrapers->searchByIsbn((string)$isbn);
            } catch (\InvalidArgumentException $e) {
                return response()->json(
                    [
                        'status' => 400,
                        'userMessage' => 'ISBN文字列が不正です。'
                    ],
                    400
                );
            }

            // すべてのScraperが情報取得に失敗した場合
            if($new_book == null){
                return response()->json(
                    [
                        'status' => 500,
                        'userMessage' => 'お探しの本の情報を取得することができませんでした。'
                    ],
                    500
                );
            }
            // booksテーブルに挿入する
            $new_book->save();
        }

        $book = $book ?? $new_book;

        // 当該ユーザのuser_bookテーブルに同じ本がすでに登録されているかのチェック
        $is_userBook_exists = UserBook::where('book_id', $book->id)->where('user_id', $authId)->exists();
        if($is_userBook_exists){
            return response()->json(
                [
                    'status' => 409,
                    'userMessage' => '追加しようとした本はすでに本棚に登録されています。'
                ],
                409
            );
        }

        // user_bookテーブルに挿入する
        $user_book = new UserBook;
        $user_book->user_id = $authId;
        $user_book->book_id = $book->id;

        if (in_array($book->genre_id, Genre::SPOILER_ID_LIST)) {
            $user_book->is_spoiler = true;
        }

        $user_book->save();

        // レスポンスデータの生成
        $userBook = UserBook::with([
                'user',
                'book',
                'review',
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
            ->find($user_book->id);

        return response()->json($userBook, 201);

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
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
        }

        $userBook = UserBook::with([
                'user',
                'book',
                'review',
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
            ->find($userBookId);

        return response()->json($userBook);
    }

    public function __construct(){
      $this->middleware('can:update,userBook')->only('update');
    }

    /**
     * ユーザの本棚の読了ステータスやネタバレフラグを変更する
     *
     * @param  \Illuminate\Http\Request  $request
     * 　PUTメソッドで送られてくる。
     * @param $user
     * @param $userBook
     *
     * @return \Illuminate\Http\Response
     * 　JSON形式で本情報をまとめて返す
     */
    public function update(Request $request, User $user, UserBook $userBook)
    {
        $authId = auth()->guard('api')->id();

        $validator = \Validator::make($request->all(), [
            'reading_status' => 'required|string|max:16',
            'is_spoiler' => 'required|boolean',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'userMessage' => $validator->errors()
            ], 400);
        }

        $userBook->reading_status = UserBook::READING_STATUS[$request->input('reading_status')];
        $userBook->is_spoiler = $request->input('is_spoiler');
        $userBook->save();

        $userBook = UserBook::with([
                'user',
                'book',
                'review',
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
            ->find($userBook->id);

        return response()->json($userBook);
    }

    /**
     * 削除API
     *
     * @UserBook $userBook
     */
    public function delete(UserBook $userBook){
        // 存在しないUserBookを指定した場合はサーバが自動的に404を返す

        // 認可チェック
        $authId = auth()->guard('api')->id();
        if($authId != $userBook->user_id){
            return response()->json(
                [
                    'status' => 403,
                    'userMessage' => '自分以外の本を削除することはできません。'
                ],
                403
            );
        }

        $userBook->delete();

        return response()->json(
            [
                'status' => 200,
                'userMessage' => '削除しました。'
            ],
            200
        );
    }
}
