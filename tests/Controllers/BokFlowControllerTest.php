<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\BokFlowController;
use App\Models\User;
use App\Models\Bok;
use App\Models\UserBook;
use App\Models\Follower;

class BokFlowControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test自分の空のBokFlowを取得する() {
        $this->actingAs($this->user, 'api');

        $followers = factory(Follower::class, 2)->create(['user_id' => $this->user->id]);

        $response = \App::make(BokFlowController::class)->index();
        $this->assertEquals(200, $response->status());
    }

    public function test自分のBokFlowを取得する() {
        $this->actingAs($this->user, 'api');

        $follower = factory(Follower::class)->create(['user_id' => $this->user->id]);
        $userBook = factory(UserBook::class)->create(['user_id' => $this->user->id]);
        $boks = factory(Bok::class, 2)->create([
            'user_id' => $follower->target_id,
            'user_book_id' => $userBook->id,
        ]);

        $response = \App::make(BokFlowController::class)->index();
        $this->assertEquals(200, $response->status());
        $this->assertEquals(2, count($response->getData()));
    }
}
