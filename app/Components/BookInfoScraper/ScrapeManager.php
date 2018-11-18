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
     * ISBN文字列をハイフン無しISBN13に正規化する
     * 
     * @param   string  $isbn
     *  正規化対象ISBN文字列
     * 
     * @return  string
     * 
     * @throws  \InvalidArgumentException
     *  ISBN文字列として不正な場合にスローされる例外
     */
    public static function normalizeIsbn(string $isbn)
    {
        $isbn   = str_replace('-', '', $isbn);
        $length = strlen($isbn);

        if (10 !== $length && 13 !== $length) {
            throw new \InvalidArgumentException();
        }

        // MEMO: グループ記号などをしっかりと判定する必要はないと判断した。
        // それをBadRequestとしたいのであればルーティングではじけばいいと考えたから。
        if (1 !== preg_match('/\A(97[89][0-9]{10}|[0-9]{9}[0-9X])\z/', $isbn)) {
            throw new \InvalidArgumentException();
        }

        // チェックディジット計算(モジュラス10/ウェイト3)
        if (10 === $length) {
            $sum        = 0;
            $isbn       = '978' . substr($isbn, 0, -1);

            for ($i = 0; $i < 12; ++$i) {
                $sum += (1 === ($i + 1) % 2)
                    ? (int)$isbn[$i] * 1 // 奇数番
                    : (int)$isbn[$i] * 3 // 偶数番
                ;
            }

            $remainder = $sum % 10;

            if (0 === $remainder) {
                $isbn = $isbn . '0';
            } else {
                $isbn = $isbn . (string)(10 - $remainder);
            }
        }

        return $isbn;
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
        $isbn = self::normalizeIsbn($isbn);

        foreach ($this->scrapers as $scraper) {
            $book = $scraper->searchByIsbn($isbn);
            if (false !== $book) {
                return $book;
            }
        }

        return false;
    }
}
