<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\FollowerController;
use App\User;
use App\Follower;

class FollowerControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test自分のフォロワーの一覧を取得する() {
        $this->actingAs($this->user, 'api');
        $followers = factory(Follower::class, 2)->create(['target_id' => $this->user->id]);

        $response = \App::make(FollowerController::class)->followers($this->user);
        $this->assertEquals(200, $response->status());
    }

    public function test自分のフォローした人一覧を取得する() {
        $this->actingAs($this->user, 'api');
        $followers = factory(Follower::class, 2)->create(['user_id' => $this->user->id]);

        $response = \App::make(FollowerController::class)->followings($this->user);
        $this->assertEquals(200, $response->status());
    }

    public function testフォローする() {
        $this->actingAs($this->user, 'api');
        $targetUser = factory(User::class)->create();

        $request = new Request(['user_id' => $targetUser->id]);
        $response = \App::make(FollowerController::class)->follow($request, $this->user);
        $this->assertEquals(200, $response->status());
    }

    public function testフォロー解除する() {
        $this->actingAs($this->user, 'api');
        $targetUser = factory(User::class)->create();
        $targetUser = factory(Follower::class)->create(['user_id' => $this->user->id, 'target_id' => $targetUser->id]);

        $request = new Request(['user_id' => $targetUser->id]);
        $response = \App::make(FollowerController::class)->follow($request, $this->user);
        $this->assertEquals(200, $response->status());
    }
}
