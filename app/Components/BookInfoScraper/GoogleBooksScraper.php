<?php

namespace App\Components\BookInfoScraper;

use GuzzleHttp\Client;
use App\Book;

class GoogleBooksScraper implements ScraperInterface
{
    // APIのエントリポイント
    private const URI = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    /**
     *  コンストラクタ
     *
     */
    public function __construct(){
    }

    /**
     * 著者情報の整形処理
     * 
     * @param $bookInfoAuthor
     * 
     * @return $consAuthors | $bookInfoAuthor
     *   引数に渡されたものが配列であれば文字列に連結して返す。
     * 　配列でない場合はそのまま返す。
     */
    private function concatAuthors($bookInfoAuthor){
        if(is_array($bookInfoAuthor)){
            $authors = str_replace(", ", "", $bookInfoAuthor);
            $consAuthors = implode('/', $authors);

            return $consAuthors;
        }

        return $bookInfoAuthor;
    }

    /**
     * タイトル情報整形処理
     * 
     * @return string
     *   サブタイトルがあれば「:」で連結して返す。
     * 　なければ、タイトルをそのまま返す。
     */
    private function concatTitles($bookInfo){
        if(array_key_exists("subtitle", $bookInfo)){
            return $bookInfo->title . ': ' . $bookInfo->subtitle;
        }
        return $bookInfo->title;
    }

    /**
     * ScrapeInterface::searchByIsbn()の実装
     * GoogleBooksAPIを叩き、本の情報を取得する。
     * その情報をもとにApp\Bookに情報を格納してマネージャに返す。
     *
     * @param string $isbn
     *  正規化されたISBN
     *
     * @return App\Book | null
     *  戻り値があればApp\Bookにして返す。
     *  なかった場合はnullを返す。
     */
    public function searchByIsbn(string $isbn){

        // GuzzleHttp\Clientのインスタンスを生成。
        // 正規化されたISBN文字列をクエリパラメータとしてリクエストを送る。
        $client = new Client();
        $response = $client->request('GET', (self::URI . $isbn))
                           ->getBody();

        // JSON形式にデコード
        $bookInfo = json_decode($response);

        if(JSON_ERROR_NONE !== json_last_error()){
            return null;
        }

        //レスポンスなければnullを返す
        if( $bookInfo->totalItems === 0) return null;
        $bookInfo = $bookInfo->items[0]->volumeInfo;

        // App\Bookのインスタンスを生成。
        $book = new Book;

        // レスポンスで得た情報を該当カラムに格納する。
        $book->isbn = $isbn;
        $book->name = $this->concatTitles($bookInfo);
        $book->description = array_key_exists("description", $bookInfo) ? $bookInfo->description : "";
        $book->cover = array_key_exists("imageLinks", $bookInfo) ? $bookInfo->imageLinks->smallThumbnail : "";
        $book->author = property_exists($bookInfo, "authors") ? $this->concatAuthors($bookInfo->authors) : "";

        // App\Bookをスクレイプマネージャに返す
        return $book;

    }
}
