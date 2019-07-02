<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\ReactionController;
use App\User;
use App\UserBook;
use App\Bok;
use App\Reaction;

class ReactionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test自分の良いね一覧を取得する() {
        $this->actingAs($this->user, 'api');
        $userBook = factory(UserBook::class)->create(['user_id' => $this->user->id]);
        $bok = factory(Bok::class)->create([
            'user_id' => $this->user->id,
            'user_book_id' => $userBook->id,
        ]);
        $followers = factory(Reaction::class)->create([
            'user_id' => $this->user->id,
            'bok_id' => $bok->id,
            'liked' => true
        ]);

        $response = \App::make(ReactionController::class)->userLikes($this->user->id);
        $this->assertEquals(200, $response->status());
    }

    public function test自分のブックマーク一覧を取得する() {
        $this->actingAs($this->user, 'api');
        $userBook = factory(UserBook::class)->create(['user_id' => $this->user->id]);
        $bok = factory(Bok::class)->create([
            'user_id' => $this->user->id,
            'user_book_id' => $userBook->id,
        ]);
        $followers = factory(Reaction::class)->create([
            'user_id' => $this->user->id,
            'bok_id' => $bok->id,
            'loved' => true
        ]);

        $response = \App::make(ReactionController::class)->userLoves($this->user->id);
        $this->assertEquals(200, $response->status());
    }

    public function testいいねする() {
        $this->actingAs($this->user, 'api');
        $bok = factory(Bok::class)->create();
        $response = \App::make(ReactionController::class)->storeLike($bok->id);
        $this->assertEquals(200, $response->status());
    }
}
