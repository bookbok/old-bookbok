<?php

namespace App\Components;

/**
 * 外部のAPIを通じて書籍情報を取得するコンポーネント
 */
class ISBN
{
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
    public static function normalize(string $isbn)
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
            $isbn = '978' . substr($isbn, 0, -1);
            $isbn = $isbn . self::calculateIsbn13CheckDigit($isbn);
        }

        return $isbn;
    }

    /**
     * ISBN13のチェックディジットを計算する
     *
     * @param   string  $isbn
     *  ISBN13のチェックディジットを除いた12桁の文字列
     *
     * @return  int
     */
    public static function calculateIsbn13CheckDigit(string $isbn)
    {
        if (1 !== preg_match('/[0-9]{12}/', $isbn)) {
            throw new \InvalidArgumentException();
        }

        $sum = 0;

        for ($i = 0; $i < 12; ++$i) {
            $sum += (1 === ($i + 1) % 2)
                ? (int)$isbn[$i] * 1 // 奇数番
                : (int)$isbn[$i] * 3 // 偶数番
            ;
        }

        $remainder = $sum % 10;

        if (0 === $remainder) {
            return 0;
        }

        return 10 - $remainder;
    }
}
