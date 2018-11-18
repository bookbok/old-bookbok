<?php

namespace Tests\Unit\Components\BookInfoScraper;

use App\Components\BookInfoScraper\ScrapeManager;
use Tests\TestCase;

class ScrapeManagerTest extends TestCase
{

    /**
     * [ISBN文字列正規化処理] 正常な値が渡された場合のテスト
     * 
     * @dataProvider    provideNormalizeIsbnWithValidValue
     */
    public function testNormalizeIsbnWithValidValue(string $expected, string $isbn)
    {
        $this->assertSame(
            $expected,
            ScrapeManager::normalizeIsbn($isbn)
        );
    }

    /**
     * [データプロバイダ] testNormalizeIsbnWithValidValue
     */
    public function provideNormalizeIsbnWithValidValue()
    {
        return [
            // ["期待値", "変換対象値"],
            ["9784760122776", "476012277X"],        // 普通の計算
            ["9784805806388", "4805806389"],        // 普通の計算
            ["9784805006580", "480500658X"],        // 余りが0になる計算
            ["9784805806388", "4-8058-0638-9"],     // ハイフン入りISBN10
            ["9784774174594", "978-4-7741-7459-4"], // ハイフン入りISBN13
        ];
    }

    /**
     * [ISBN文字列正規化処理] 不正な値が渡された場合のテスト
     * 
     * @dataProvider    provideNormalizeIsbnWithInvalidValue
     * 
     * @expectedException   \InvalidArgumentException
     */
    public function testNormalizeIsbnWithInvalidValue(string $isbn){
        ScrapeManager::normalizeIsbn($isbn);
    }
    
    /**
     * [データプロバイダ] testNormalizeIsbnWithInvalidValue
     */
    public function provideNormalizeIsbnWithInvalidValue()
    {
        return [
            // ["不正値"],
            ["012345678"],      // 桁間違い
            ["01234567890"],    // 桁間違い
            ["012345678901"],   // 桁間違い
            ["01234567890123"], // 桁間違い
            ["9770123456789"],  // ISBN13プレフィックス間違い
            ["012345678Y"],     // ISBN10チェックディジット間違い
            ["a-012345678"],    // 不正文字混入
        ];
    }
}
