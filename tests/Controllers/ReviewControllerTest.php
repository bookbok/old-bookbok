<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\ReviewController;
use App\Models\User;
use App\Models\Review;
use App\Models\UserBook;
use App\Http\Requests\ReviewRequest;

class ReviewControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function testユーザーの本にレビューを投稿する() {
        $this->actingAs($this->user, 'api');

        $userBook = factory(UserBook::class)->create([
            'user_id' => $this->user->id,
        ]);

        $request = new ReviewRequest(['title' => 'Test title of review', 'body' => 'Test body of review.']);
        $response = \App::make(ReviewController::class)->store($request, $userBook);
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Test body of review.', $response->getData()->body);
    }

    public function testユーザーの本のレビューを更新する() {
        $this->actingAs($this->user, 'api');

        $userBook = factory(UserBook::class)->create([
            'user_id' => $this->user->id,
        ]);
        $review = factory(Review::class)->create([
            'user_id' => $this->user->id,
            'user_book_id' => $userBook->id,
        ]);

        $request = new ReviewRequest(['title' => 'Test title of review', 'body' => 'Test updated body of review.']);
        $response = \App::make(ReviewController::class)->store($request, $userBook);
        $this->assertEquals(200, $response->status());
        $this->assertEquals('Test updated body of review.', $response->getData()->body);
    }
}


