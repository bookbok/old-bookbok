<?php

namespace App\Components\BookInfoScraper;

use GuzzleHttp\Client;
use App\Book;

class GoogleBooksScraper implements ScraperInterface
{
    // APIのエントリポイント
    private const URI = "https://www.googleapis.com/books/v1/volumes?q=";

    /**
     *  コンストラクタ
     * 
     */
    public function __construct(){
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

        // レスポンスなければnullを返す
        if( $bookInfo->totalItems === 0) return null;

        // App\Bookのインスタンスを生成。
        $book = new Book;

        // レスポンスで得た情報を該当カラムに格納する。
        $book->isbn = $bookInfo->items[0]->volumeInfo->industryIdentifiers[1]->identifier;
        $book->name = $bookInfo->items[0]->volumeInfo->title;
        $book->description = $bookInfo->items[0]->volumeInfo->description;
        $book->conver = $bookInfo->items[0]->volumeInfo->imageLinks->smallThumbnail;
        $book->author = $bookInfo->items[0]->volumeInfo->authors;
        // $book->genre_id = $bookInfo->items[0]->volumeInfo->categories;

        // App\Bookをスクレイプマネージャに返す
        return $book;
    
    }
}