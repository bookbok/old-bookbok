<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\BokController;
use App\User;
use App\Bok;
use App\UserBook;

class BokControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function testユーザーの本棚を取得する() {
        $this->actingAs($this->user, 'api');
        $userBook = factory(UserBook::class)->create([
            'user_id' => $this->user->id,
        ]);
        factory(Bok::class, 2)->create([
            'user_id' => $this->user->id,
            'user_book_id' => $userBook->id,
        ]);
        $response = \App::make(BokController::class)->index($userBook->id);
        $this->assertEquals(200, $response->status());

        $this->assertEquals(2, count($response->getData()));
    }
}

