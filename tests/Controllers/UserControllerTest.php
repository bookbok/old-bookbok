<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\UserController;
use App\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function testユーザーの一覧を取得する() {
        factory(User::class, 2)->create();

        $response = \App::make(UserController::class)->index();
        $this->assertEquals(200, $response->status());
        $this->assertEquals(3, count($response->getData()));
    }

    public function testログイン状態でユーザーの一覧を取得する() {
        $this->actingAs($this->user, 'api');
        factory(User::class, 2)->create();

        $response = \App::make(UserController::class)->index();
        $this->assertEquals(200, $response->status());
        $this->assertEquals(3, count($response->getData()));
    }

    public function testユーザーを取得する() {
        $response = \App::make(UserController::class)->show($this->user->id);
        $this->assertEquals(200, $response->status());
    }
}

