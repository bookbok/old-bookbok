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

        $this->artisan('passport:install');
    }

    public function testログインする() {
        $pass = 'password';
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);
        $this->user = factory(User::class)->create(['password' => $hashedPass]);

        $request = new LoginRequest(['email' => $this->user->email, 'password' => $pass]);
        $response = \App::make(LoginController::class)->login($request);
        $this->assertEquals(200, $response->status());
    }
}
