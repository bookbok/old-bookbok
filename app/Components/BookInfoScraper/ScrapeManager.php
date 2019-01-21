<?php

namespace App\Components\BookInfoScraper;

use App\Components\ISBN;
use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;
use App\Genre;

/**
 * 外部のAPIを通じて書籍情報を取得するコンポーネント
 */
class ScrapeManager
{
    /**
     * @var ScraperInterface[]
     */
    private $scrapers;

    /**
     * @var String
     */
    public $uri_rakuten_book;

    /**
     * Constructor
     *
     * @param   ScraperInterface[]  $scrapers
     *  スクレイパーの配列
     */
    public function __construct(string $base_uri, array $scrapers){
        $this->uri_rakuten_book = $base_uri;
        $this->scrapers = $scrapers;
    }

    /**
     * 楽天ブックスAPIを利用してジャンル情報を取得する
     * 
     * @param string $isbn
     * 　検索対象ISBN。
     * 　正規化されたものを受け取ることを前提とする。
     * 
     * @return int
     * 　ジャンルID
     */
    public function getGenre(string $isbn){
        $client = new Client();
        $response = $client->request('GET', ($this->uri_rakuten_book . $isbn))
                           ->getBody();

        $response = json_decode($response);

        if(JSON_ERROR_NONE !== json_last_error() || $response->count === 0){
            return Genre::ELSE_ID;
        }

        return  (int)substr($response->Items[0]->Item->booksGenreId, 4, 2);
    }

    /**
     * 外部APIを通じてISBNから書籍情報を取得する
     *
     * @param   string  $isbn
     *  検索対象ISBN。
     *  ISBN10の場合、プレフィックス978のISBN13に変換して検索する。
     *
     * @return  \App\Book|false
     *  見つかった場合はApp\Bookモデルを返す。
     *  見つからなかった場合はfalseを返す
     *
     * @throws  \InvalidArgumentException
     *  ISBN文字列として不正な場合にスローされる例外
     */
    public function searchByIsbn(string $isbn)
    {
        $isbn = ISBN::normalize($isbn);

        foreach ($this->scrapers as $scraper) {
            $book = $scraper->searchByIsbn($isbn);
            if (null !== $book) {
                if (
                    '' === $book->name || null === $book->name
                    || '' === $book->cover || null === $book->cover
                    || '' === $book->author || null === $book->author
                ) {
                    // 本のタイトル・カバー画像・著者名のうちのどれかが正常に取得できなかった場合、
                    // 次のscraperへ処理をゆだねる。
                    continue;
                }

                $book->genre_id = $this->getGenre($isbn);
                return $book;
            }
        }

        return null;
    }
}
