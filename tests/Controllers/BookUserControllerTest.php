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

        $user_id = $this->user->id;
        $res = $this->withHeaders($this->headersWithToken)->json(
            'POST',
            "http://localhost:8000/api/users/${user_id}/user_books",
            [
                'isbn' => '9784063842760'
            ]
        );
        $res->assertStatus(500);

        $res = $this->withHeaders($this->headersWithToken)->json(
            'POST',
            'http://localhost:8000/api/users/2/user_books',
            [
                'isbn' => '9784063842760'
            ]
        );
        $res->assertStatus(403);
    }
}
