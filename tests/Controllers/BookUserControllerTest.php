<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\UserBook;
use App\Book;
use GuzzleHttp\Client;


use Laravel\Passport\ClientRepository;
use Illuminate\Support\Facades\DB;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Components\BookInfoScraper\ScrapeManager;
use App\Http\Controllers\UserBookController;
use Illuminate\Http\Request;

class UserBookControllerTest extends TestCase
{
    use RefreshDatabase;
    //use DatabaseTransactions;

    protected $headersWithToken = [];
    protected $headersWithoutToken = [];
    protected $scopes = [];
    protected $user;

    /** @var CuzzleHttp\Client */
    private $client;

    public function tearDown()
    {
        parent::tearDown();
        \Mockery::close();
    }

    /**
     * @test
     */
    public function BOOKに登録されていないISBNを入力されたとき、および登録されているISBNを入力されたときのテスト(){
        // Personal Access ClientをDBに作成
        $clientRepository = new ClientRepository();
        $client = $clientRepository->createPersonalAccessClient(
            null, 'Test Personal Access Client', url('/')
        );
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $client->id,
            'created_at' => new \DateTime,
            'updated_at' => new \DateTime,
        ]);

        // テストユーザの作成
        $this->user = factory(User::class)->create();
        $token = $this->user->createToken('TestToken', $this->scopes)->accessToken;

        // トークンありのリクエストのヘッダーを設定: User
        $this->headersWithToken['Content-Type'] = 'application/json';
        $this->headersWithToken['Accept'] = 'application/json';
        $this->headersWithToken['Authorization'] = 'Bearer ' . $token;

        // トークンなしのリクエストのヘッダーを設定: User
        $this->headersWithoutToken['Content-Type'] = 'application/json';
        $this->headersWithoutToken['Accept'] = 'application/json';

        $book = factory(Book::class)->make();
        $mock = \Mockery::mock(ScrapeManager::class)
            ->shouldReceive('searchByIsbn')
            ->twice()
            //->once() // 1度しか呼ばれないことを期待する
            ->andReturn($book)
            ->getMock();
        $this->app->bind('app.bookInfo.scrapeManager', function() use ($mock) {
            return $mock;
        });

        $this->actingAs($this->user, 'api');
        $request = new Request(['isbn' => '9784063842760']);
        $response = \App::make(UserBookController::class)->store($request, $this->user);

        $this->assertEquals(201, $response->status());
        $data = collect($response->getData());

        $this->assertTrue($data->contains('user'));
        $this->assertTrue($data->contains('book'));
        $this->assertTrue($data->contains('review'));
        $this->assertTrue($data->contains('boks'));


        $this->otherUser = factory(User::class)->create();
        $response = \App::make(UserBookController::class)->store($request, $this->otherUser);
        $this->assertEquals(409, $response->status());
    }
}
