<?php

namespace App\Components\BookInfoScraper;

use App\Components\ISBN;
use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;

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
     * Constructor
     * 
     * @param   ScraperInterface[]  $scrapers
     *  スクレイパーの配列
     */
    public function __construct(array $scrapers){
        $this->scrapers = $scrapers;
    }

    /**
     * 楽天ブックスAPIを利用してジャンル情報を取得する
     * 
     * @param string $isbn
     * 　検索対象ISBN。
     * 　正規化されたものを受け取ることを前提とする。
     * 
     * @return 
     * 　ジャンル
     */
    public function getGenre(string $isbn){

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
                $book->genre_id = 1;
                return $book;
            }
        }

        return null;
    }
}
