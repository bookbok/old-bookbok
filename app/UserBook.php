<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
{
    protected $table = 'user_book';
    protected $fillable = [
        'user_id', 'book_id', 'is_spoiler', 'reading_status',
    ];

    public const READING_STATUS = [
        'none' => 0,     // 未設定
        'wanted' => 5,   // 欲しい
        'unread' => 10,  // 積読
        'reading' => 15, // 読書中
        'readed' => 20,  // 読書了
    ];

    protected $casts = [
        'is_spoiler' => 'boolean',
    ];

    /**
     * リレーション定義
     */
    public function review(){
        return $this->hasOne(Review::class, 'user_book_id')
                    ->withDefault([
                        "title" => "無題",
                        "body"  => "未記入",
                    ]);
    }

    public function boks(){
        return $this->hasMany(Bok::class, 'user_book_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function book(){
        return $this->belongsTo(Book::class);
    }


    /**
     * Query scope
     */

    public function scopeNoneStatus($query){
        return $query->where('reading_status', self::READING_STATUS['none']);
    }

    public function scopeWantedStatus($query){
        return $query->where('reading_status', self::READING_STATUS['wanted']);
    }

    public function scopeUnreadStatus($query){
        return $query->where('reading_status', self::READING_STATUS['unread']);
    }

    public function scopeReadingStatus($query){
        return $query->where('reading_status', self::READING_STATUS['reading']);
    }

    public function scopeReadedStatus($query){
        return $query->where('reading_status', self::READING_STATUS['readed']);
    }

    public function scopeWhereFromUserAndBook($query, $userId, $bookId) {
        return $query->where('user_id', '=', $userId)->where('book_id', '=', $bookId);
    }

    /**
     * User methods
     */
    public static function registeUserBooks(array $filterd_isbn_array, int $authId) {
        //　ユーザの本棚に登録されている本と重複しないかをチェックして
        //　問題なければユーザの本棚に新規登録する
        foreach($filterd_isbn_array as $isbn){
            if(Book::where('isbn', '=', $isbn)->exists()){
                $bookName = self::registeUserBook($authId, $isbn);

                if ($bookName) {
                    $bookNames[] = $bookName;
                }
                continue;
            }

            // App\Bookに存在していない場合
            $bookName = self::registeScrapedBookTo($authId, $isbn);
            if ($bookName) {
                $bookNames[] = $bookName;
            }
        }
        return $bookNames;
    }

    private static function registeScrapedBookTo(int $authId, string $isbn) {
        // ScrapeManagerを使って本情報を取得してからBookとUserBook双方の登録を行う
        $scrapers = resolve('app.bookInfo.scrapeManager');

        // すでにISBN文字列の正規化は行っているので例外（\InvalidArgumentException）を考慮しない
        $newBook = $scrapers->searchByIsbn($isbn);
        if($newBook == null){
           return null;
        }
        $newBook->save();

        UserBook::create([
            'user_id' => $authId,
            'book_id' => $newBook->id
        ]);
        return $newBook->name;
    }

    private static function registeUserBook(int $userId, string $isbn) {
        $book = Book::where('isbn', '=', $isbn)->first();

        $userBook = UserBook::firstOrCreate([
            'user_id' => $userId,
            'book_id' => $book->id
        ]);

        if($userBook->wasRecentlyCreated) {
            return $book->name;
        }
        return null;
    }
}
