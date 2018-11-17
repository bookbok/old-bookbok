<?php

namespace App\Components\BookInfoScraper;

use Illuminate\Support\ServiceProvider;

interface ScraperInterface
{
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
    public function searchByIsbn(string $isbn);
}
