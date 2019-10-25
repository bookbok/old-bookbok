<?php

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\ClientRepository;
use Illuminate\Support\Facades\DB;

use App\User;

class PassportTestCase extends TestCase
{
    use RefreshDatabase;

    protected $headersWithToken = [];
    protected $headersWithoutToken = [];
    protected $scopes = [];
    protected $user;

    public function setUp()
    {
        parent::setUp();

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

        // トークンありのリクエストのヘッダーを設定
        $this->headersWithToken['Content-Type'] = 'application/json';
        $this->headersWithToken['Accept'] = 'application/json';
        $this->headersWithToken['Authorization'] = 'Bearer ' . $token;

        // トークンなしのリクエストのヘッダーを設定
        $this->headersWithoutToken['Content-Type'] = 'application/json';
        $this->headersWithoutToken['Accept'] = 'application/json';
    }
}
