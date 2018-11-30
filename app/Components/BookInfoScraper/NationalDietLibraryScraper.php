<?php

namespace App\Components\BookInfoScraper;

use GuzzleHttp\Client;
use App\Book;

class NationalDietLibraryScraper implements ScraperInterface
{
    // APIのエントリポイント
    private const URI = "http://iss.ndl.go.jp/api/opensearch?isbn=";

    /**
     *  コンストラクタ
     * 
     */
    public function __construct(){

    }

    /**
     *  ScrapeInterface::searchByIsbn()の実装
     *  国会図書館のAPIを叩き、本の情報を取得する。
     *  その情報をもとにApp\Bookに情報を格納してマネージャに返す。
     * 
     *  @param string $isbn
     *   正規化されたISBN
     * 
     *  @return App\Book | null
     *   戻り値があればApp/Bookにして返す。
     *   なかった場合はnullを返す。
     */
    public function searchByIsbn(string $isbn){

        // GuzzleHttp\Clientのインスタンスを生成。
        // 正規化されたISBN文字列をクエリパラメータとしてリクエストを送る。
        $client = new Client();
        $response = $client->request('GET', (self::URI . $isbn))
                           ->getBody()
                           ->getContents();

        // 文字列$responseをSimpleXMLElementにパースする
        $xml = simplexml_load_string($response);

        // XML内の名前空間を取得
        $nameSpaces = $xml->getNamespaces(true);

        // channel配下にある名前空間'openSearch'を取得する
        $channel = $xml->channel;
        $channelBookInfoXML = $channel->children($nameSpaces['openSearch']);
        // 検索結果が0件ならばnullを返す
        if( $channelBookInfoXML->totalResults[0] == 0) return null;

        // item配下にある名前空間'dc'の要素を取得する
        $item = $xml->channel->item;
        $dcBookInfoXML = $item->children($nameSpaces['dc']);
        // JSONオブジェクトに変換
        $dcBookInfoJSON = json_decode(json_encode($dcBookInfoXML, true));
        
        $book = new Book;

        $book->isbn = (int)($isbn);
        $book->name = $dcBookInfoJSON->title;
        $book->description = $dcBookInfoJSON->description;
        $book->cover = "";
        $book->author = str_replace(", ", "", $dcBookInfoJSON->creator);

        return $book;
    }
}