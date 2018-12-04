<?php

namespace Tests\Unit\Components\BookInfoScraper;

use App\Book;
use App\Components\BookInfoScraper\OpenBDScraper;
use GuzzleHttp\Client;
use Tests\TestCase;
use Psr\Http\Message\ResponseInterface;

class OpenBDScraperTest extends TestCase
{
    private const EXISTS_ISBN       = '9784594612634';
    private const NOT_EXISTS_ISBN   = '9784150310738';
    private const ERROR_ISBN        = '9784150310739';
    private const EXISTS_STATUS     = 200;
    private const NOT_EXISTS_STATUS = 200;
    private const ERROR_STATUS      = 500;
    private const EXISTS_BODY       = '[{"onix": {"RecordReference": "9784594612634", "NotificationType": "03", "ProductIdentifier": {"ProductIDType": "15", "IDValue": "9784594612634"}, "DescriptiveDetail": {"ProductComposition": "00", "ProductForm": "BA", "ProductFormDetail": "B122", "TitleDetail": {"TitleType": "01", "TitleElement": {"TitleElementLevel": "01", "TitleText": {"collationkey": "デンドウイリレシピモダイコウカイクックパッドノモットスピードオカズヒャクハチ", "content": "殿堂入りレシピも大公開！ クックパッドのもっと！スピードおかず108"}}}, "Contributor": [{"SequenceNumber": "1", "ContributorRole": ["B20"], "PersonName": {"collationkey": "クックパッドカビブシキガイシャ", "content": "クックパッド株式会社"}, "BiographicalNote": "クックパッド20?30代の女性を中心に、月間のべ6000万人以上が利用している日本最大のレシピサービス。「毎日の料理を楽しみにする」という理念のもと、料理レシピの投稿・検索サイトとして1998年3月にサービスを開始し、2018年３月現在の投稿レシピ数は274万品超となっている。"}], "Language": [{"LanguageRole": "01", "LanguageCode": "jpn"}], "Subject": [{"SubjectSchemeIdentifier": "78", "SubjectCode": "9477"}, {"SubjectSchemeIdentifier": "20", "SubjectHeadingText": "手間;時短;スピード;おか;つくれぽ;殿堂入りレシピ;〇〇しない;5分以内;事前に仕込める;クックパッド;激うま;アイデア;レシピ;レシピ;サービス"}], "Audience": [{"AudienceCodeType": "22", "AudienceCodeValue": "00"}]}, "CollateralDetail": {"TextContent": [{"TextType": "03", "ContentAudience": "00", "Text": "****************************************\nぱぱっと手間なくつくれておいしい！\n大好評“時短”テーマの第２弾\n*****************************************\n\n大好評を博した“スピードおかず”の第2弾！\n時間がない日に役立つ時短おかずを厳選しました。\n「つくれぽ」が1000人を超えた殿堂入りレシピのほか、\n“〇〇しない”“5分以内”“事前に仕込める”など、\nクックパッドでよく検索されている「時短」にまつわるキーワードで選んだつくれぽ大反響レシピ、\n献立決めに重宝する素材別・激うまスピードおかずを掲載。\nどれも簡単なのに、見た目も味も大満足のおかずが勢ぞろいです！\n覚えておくと便利な調理の時短テクニックを集めた特別保存版「時短裏ワザBOOK」も毎日の食事づくりにお役立ち。\n「こんなに簡単にできちゃうの？」と驚くようなアイデアレシピがたっぷりです！　\n\n"}], "SupportingResource": [{"ResourceContentType": "01", "ContentAudience": "01", "ResourceMode": "03", "ResourceVersion": [{"ResourceForm": "02", "ResourceVersionFeature": [{"ResourceVersionFeatureType": "01", "FeatureValue": "D502"}, {"ResourceVersionFeatureType": "04", "FeatureValue": "9784594612634.jpg"}], "ResourceLink": "https://cover.openbd.jp/9784594612634.jpg"}]}]}, "PublishingDetail": {"Imprint": {"ImprintIdentifier": [{"ImprintIDType": "19", "IDValue": "594"}, {"ImprintIDType": "24", "IDValue": "7530"}], "ImprintName": "扶桑社"}, "Publisher": {"PublishingRole": "01", "PublisherIdentifier": [{"PublisherIDType": "19", "IDValue": "594"}, {"PublisherIDType": "24", "IDValue": "7530"}], "PublisherName": "扶桑社"}, "PublishingDate": [{"PublishingDateRole": "01", "Date": "20180317"}]}, "ProductSupply": {"SupplyDetail": {"ReturnsConditions": {"ReturnsCodeType": "04", "ReturnsCode": "03"}, "ProductAvailability": "99", "Price": [{"PriceType": "03", "PriceAmount": "500", "CurrencyCode": "JPY"}]}}}, "hanmoto": {"datemodified": "2018-03-22 16:29:32", "datecreated": "2018-02-20 10:26:50", "datekoukai": "2018-02-20"}, "summary": {"isbn": "9784594612634", "title": "殿堂入りレシピも大公開！ クックパッドのもっと！スピードおかず108", "volume": "", "series": "", "publisher": "扶桑社", "pubdate": "20180317", "cover": "https://cover.openbd.jp/9784594612634.jpg", "author": "クックパッド株式会社／監修"}}]';
    private const NOT_EXISTS_BODY   = '[null]';
    private const ERROR_BODY        = '';

    /**
     * @var OpenBDScraper
     */
    private $scraper;

    /**
     * {@inheritdoc}
     */
    public function setup()
    {
        $client    = $this->createMock(Client::class);
        $response1 = $this->createMock(ResponseInterface::class);
        $response2 = $this->createMock(ResponseInterface::class);
        $response3 = $this->createMock(ResponseInterface::class);

        $response1->method('getStatusCode')->willReturn(self::EXISTS_STATUS);
        $response2->method('getStatusCode')->willReturn(self::NOT_EXISTS_STATUS);
        $response3->method('getStatusCode')->willReturn(self::ERROR_STATUS);

        $response1->method('getBody')->willReturn(self::EXISTS_BODY);
        $response2->method('getBody')->willReturn(self::NOT_EXISTS_BODY);
        $response3->method('getBody')->willReturn(self::ERROR_BODY);

        $map    = [
            ['GET', OpenBDScraper::URI . self::EXISTS_ISBN,     [], $response1],
            ['GET', OpenBDScraper::URI . self::NOT_EXISTS_ISBN, [], $response2],
            ['GET', OpenBDScraper::URI . self::ERROR_ISBN,      [], $response3],
        ];

        $client->method('request')
            ->will($this->returnValueMap($map))
        ;

        $this->scraper = new OpenBDScraper($client);
    }

    /**
     * 情報を取ってこれた場合のテスト
     */
    public function testScrapeExistsData()
    {
        $result = $this->scraper->searchByIsbn(self::EXISTS_ISBN);

        $this->assertInstanceOf(Book::class, $result);
        $this->assertSame('9784594612634', $result->isbn);
        $this->assertSame('殿堂入りレシピも大公開！ クックパッドのもっと！スピードおかず108', $result->name);
        $this->assertSame($expect = <<<EXPECT
****************************************
ぱぱっと手間なくつくれておいしい！
大好評“時短”テーマの第２弾
*****************************************

大好評を博した“スピードおかず”の第2弾！
時間がない日に役立つ時短おかずを厳選しました。
「つくれぽ」が1000人を超えた殿堂入りレシピのほか、
“〇〇しない”“5分以内”“事前に仕込める”など、
クックパッドでよく検索されている「時短」にまつわるキーワードで選んだつくれぽ大反響レシピ、
献立決めに重宝する素材別・激うまスピードおかずを掲載。
どれも簡単なのに、見た目も味も大満足のおかずが勢ぞろいです！
覚えておくと便利な調理の時短テクニックを集めた特別保存版「時短裏ワザBOOK」も毎日の食事づくりにお役立ち。
「こんなに簡単にできちゃうの？」と驚くようなアイデアレシピがたっぷりです！　
EXPECT
            ,
            $result->description
        );
        $this->assertSame('https://cover.openbd.jp/9784594612634.jpg', $result->cover);
        $this->assertSame('クックパッド株式会社／監修', $result->author);
    }

    /**
     * 指定したISBNの本が存在していなかった場合のテスト
     */
    public function testScrapeNotExistsData()
    {
        $result = $this->scraper->searchByIsbn(self::NOT_EXISTS_ISBN);

        $this->assertSame(null, $result);
    }

    /**
     * APIサーバーの方で何らかのエラーがあった場合のテスト
     */
    public function testScrapeErrorData()
    {
        $result = $this->scraper->searchByIsbn(self::ERROR_ISBN);

        $this->assertSame(null, $result);
    }
}
