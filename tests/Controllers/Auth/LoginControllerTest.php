<?php

namespace Tests\Unit\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Laravel\Passport\ClientRepository;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Auth\LoginController;
use App\User;
use App\Bok;
use App\UserBook;
use App\Http\Requests\LoginRequest;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        //$this->artisan('passport:install');
        $clientRepository = new ClientRepository();
        $client = $clientRepository->createPersonalAccessClient(
            null, 'Test Personal Access Client', url('/')
        );
        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => $client->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function testログインする() {
        $pass = 'password';
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);
        $this->user = factory(User::class)->create(['password' => $hashedPass]);

        $request = new LoginRequest(['email' => $this->user->email, 'password' => $pass]);
        $response = \App::make(LoginController::class)->login($request);
        $this->assertEquals(200, $response->status());
    }

    public function testログアウトする() {
        $this->user = factory(User::class)->create();

        $token = $this->user->createToken('TestToken', [])->accessToken;
        $headers = ['Authorization' => 'Bearer ' . $token];

        // HACK: ログアウトはhttp通信でないとテストが難しかった
        $response = $this->get('/api/auth/logout', $headers);
        $this->assertEquals(200, $response->status());
    }
}
