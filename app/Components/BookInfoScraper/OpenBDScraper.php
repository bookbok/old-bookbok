<?php

namespace App\Components\BookInfoScraper;

use GuzzleHttp\Client;
use App\Book;

class OpenBDScraper implements ScraperInterface
{
    /**
     * APIエンドポイントURI
     */
    public const URI = "https://api.openbd.jp/v1/get?isbn=";

    /**
     * @var Client
     */
    private $client;

    /**
     * Constructor
     *
     * @param   Client  $client HTTPクライアント
     */
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * {@inheritdoc}
     */
    public function searchByIsbn(string $isbn)
    {
        $response = $this->client->request(
            'GET',
            self::URI . $isbn
        );

        if (200 !== $response->getStatusCode()) {
            return null;
        }

         // ascii制御文字が含まれているとjson_decodeでエラーが出るので制御文字はjson用改行に置き換え
        $body = preg_replace('/[[:cntrl:]]/', '\\\\n', $response->getBody());
        $data = json_decode(trim($body), true);

        if (
            JSON_ERROR_NONE !== json_last_error() // jsonエラー
            || !array_key_exists(0, $data)        // レスポンスが期待と違う
            || null === $data[0]                  // 本が見つからなかった
        ) {
            return null;
        }

        $data = $data[0];
        $book = new Book();

        $book->isbn         = $data['summary']['isbn'];
        $book->name         = $data['summary']['title'];
        $book->description  = $this->generateDescription($data);
        $book->cover        = $data['summary']['cover'];
        $book->author       = $data['summary']['author'];

        return $book;
    }

    /**
     * 説明を生成する
     *
     * @param   mixed[] $data   レスポンスデータ
     *
     * @return  string
     */
    protected function generateDescription(array $data)
    {
        if (
            !array_key_exists('onix', $data) ||
            !array_key_exists('CollateralDetail', $data['onix']) ||
            !array_key_exists('TextContent', $data['onix']['CollateralDetail'])
        ) {
            return '';
        }


        /**
         * このタイプは2, 3, 24, 4の順で優先される(4は目次なので使わない)
         * @var $type int
         */
        $type   = 99;
        $result = '';

        foreach ($data['onix']['CollateralDetail']['TextContent'] as $content) {
            if ($type < (int) $content['TextType'] || 4 === (int) $content['TextType']) {
                continue;
            }

            $type   = (int) $content['TextType'];
            $result = $content['Text'];
        }

        return trim($result);
    }
}