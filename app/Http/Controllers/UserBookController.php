<?php

namespace App\Http\Controllers;

use App\UserBook;
use App\User;
use App\Book;
use App\Genre;
use App\Components\BookInfoScraper\ScrapeManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserBookUpdateRequest;

class UserBookController extends Controller
{
    public function __construct(){
      $this->middleware('can:create,App\UserBook,user')->only('store');
      $this->middleware('can:update,userBook')->only('update');
      $this->middleware('can:delete,userBook')->only('delete');
    }

    /**
     * 特定ユーザの本棚のなかに登録されている本の一覧情報を返す
     *
     * @param userId : ユーザID
     * @return JSON形式のユーザの本棚内一覧
     */
    public function index(int $userId)
    {

        $userBooks = User::with(['books' => function($q) {
                $q->orderBy('updated_at', 'desc');
            }])
            ->find($userId);

        return response()->json($userBooks);
    }

    /**
     * ユーザの本棚に本を追加する。
     *
     * @param  \Illuminate\Http\Request  $request
     * 　ボディにはISBNが含まれている。
     * @param $user
     *
     * @return \Illuminate\Http\Response
     * 　JSON形式で本情報をまとめて返す
     */
    public function store(Request $request, User $user)
    {
        // 認可チェック
        $authId = auth()->guard('api')->id();

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
        $isUserBookExists = UserBook::where('book_id', $book->id)->where('user_id', $authId)->exists();
        if($isUserBookExists){
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
                'boks.userBook:id,user_id,book_id',
                'boks.userBook.book',
                'boks.userBook.user',
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
    public function show(int $userId, int $userBookId)
    {
        $authId = getAuthIdOrZero();

        $userBook = UserBook::with([
                'user',
                'book',
                'review',
                'boks',
                'boks.userBook:id,user_id,book_id',
                'boks.userBook.book',
                'boks.userBook.user',
            ])
            ->find($userBookId);

        return response()->json($userBook);
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
    public function update(UserBookUpdateRequest $request, User $user, UserBook $userBook)
    {
        $authId = auth()->guard('api')->id();

        $userBook->reading_status = UserBook::READING_STATUS[$request->input('reading_status')];
        $userBook->is_spoiler = $request->input('is_spoiler');
        $userBook->save();

        $userBook = UserBook::with([
                'user',
                'book',
                'review',
                'boks',
                'boks.userBook:id,user_id,book_id',
                'boks.userBook.book',
                'boks.userBook.user',
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
