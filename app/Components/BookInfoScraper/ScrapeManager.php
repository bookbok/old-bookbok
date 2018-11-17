<?php

namespace App\Components\BookInfoScraper;

use Illuminate\Support\ServiceProvider;

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
     * 外部APIを通じてISBNから書籍情報を取得する
     * 
     * @param   string  $isbn
     *  ISBN文字列。10桁の場合は先頭に978をつけて検索する。
     * 
     * @return  \App\Book|false
     *  見つかった場合はApp\Bookモデルを返す。
     *  見つからなかった場合はfalseを返す
     */
    public function searchByIsbn(string $isbn)
    {
        foreach ($this->scrapers as $scraper) {
            if (false !== ($book = $scraper->searchByIsbn($isbn))) {
                return $book;
            }
        }

        return false;
    }
}
