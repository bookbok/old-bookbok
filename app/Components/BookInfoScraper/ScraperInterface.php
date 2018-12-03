<?php

namespace App\Components\BookInfoScraper;

use Illuminate\Support\ServiceProvider;

interface ScraperInterface
{
    /**
     * 外部APIを通じてISBNから書籍情報を取得する
     * 
     * @param   string  $isbn
     *  検索対象ISBN。
     *  ISBN10の場合、プレフィックス978のISBN13に変換して検索する。
     * 
     * @return  \App\Book|null
     *  見つかった場合はApp\Bookモデルを返す。
     *  見つからなかった場合はnullを返す。
     */
    public function searchByIsbn(string $isbn);
}
