<?php

namespace App\Components\BookInfoScraper;

use GuzzleHttp\Client;
use App\Book;

class NationalDietLibraryScraper implements ScraperInterface
{
    // APIのエントリポイント
    private const URI = "http://iss.ndl.go.jp/api/opensearch?isbn=";
    private const COVER_URI = "http://iss.ndl.go.jp/thumbnail/";

    /**
     *  コンストラクタ
     *
     */
    public function __construct(){

    }

    /**
     * 著者情報の整形処理
     *
     * @param $bookInfoAuthor
     *
     * @return $consAuthors | $bookInfoAuthor
     *   引数に渡されたものが配列であれば文字列に連結して返す。
     * 　配列でない場合はそのまま返す。
     */
    private function consAuthors($bookInfoAuthor){
        if(is_array($bookInfoAuthor)){
            $authors = str_replace(", ", "", $bookInfoAuthor);
            $consAuthors = implode('/', $authors);

            return $consAuthors;
        }

        return $bookInfoAuthor;
    }

    /**
     * 本の概要情報の整形処理
     *
     * @param $bookInfoDescription
     *
     * @return $consDescription | $bookInfoDescription
     *   引数に渡されたものが配列であれば文字列に連結して返す。
     * 　配列でない場合はそのまま返す。
     */
    private function consDescription($bookInfoDescription){
        if(is_array($bookInfoDescription)){
            $consDescription = implode('/', $bookInfoDescription);

            return $consDescription;
        }

        return $bookInfoDescription;
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

        // 書籍のカバー情報が存在するかを確認するためのリクエストを送る。
        // 404Errorでの例外発生を抑制するためにfalseを設定する
        $response_cover = $client->request('GET', (self::COVER_URI . $isbn), ['http_errors' => false]);

        // 文字列$responseをSimpleXMLElementにパースする
        $xml = simplexml_load_string($response);

        // XML内の名前空間を取得
        $nameSpaces = $xml->getNamespaces(true);

        // channel配下にある名前空間'openSearch'を取得する
        $channelBookInfoXML = $xml->channel->children($nameSpaces['openSearch']);
        // 検索結果が0件ならばnullを返す
        if($channelBookInfoXML->totalResults[0] == 0) return null;

        // item配下にある名前空間'dc'の要素を取得する
        $dcBookInfoXML = $xml->channel->item->children($nameSpaces['dc']);
        // JSONオブジェクトに変換
        $jsonText       = json_encode($dcBookInfoXML, true);

        if(false === $jsonText){
            return null;
        }

        $dcBookInfoJSON = json_decode($jsonText);

        if(JSON_ERROR_NONE !== json_last_error()){
            return null;
        }

        // ScrapeManagerにreturnするBookインスタンスの生成と情報の格納
        $book = new Book;

        $book->isbn = $isbn;
        $book->name = $dcBookInfoJSON->title;
        if(property_exists($dcBookInfoJSON, 'description')){
            $book->description = $this->consDescription($dcBookInfoJSON->description);
        }else{
            $book->description = "";
        }
        if($response_cover->getStatusCode() === 404){
            $book->cover = "";
        }else{
            $book->cover = self::COVER_URI . $isbn;
        }
        if(property_exists($dcBookInfoJSON, 'creator')){
            $book->author = $this->consAuthors($dcBookInfoJSON->creator);
        }else{
            $book->author = "";
        }

        return $book;
    }
}
