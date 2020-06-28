<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Components\BookInfoScraper\ScrapeManager;
use App\Http\Controllers\BookController;
use App\Models\User;
use App\Models\Book;
use App\Models\UserBook;
use App\Models\Review;

class BookControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $book;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->book = factory(Book::class)->make();

        $mock = \Mockery::mock(ScrapeManager::class)
            ->shouldReceive('searchByIsbn')
            ->andReturn($this->book)
            ->getMock();
        $this->app->bind('app.bookInfo.scrapeManager', function() use ($mock) {
            return $mock;
        });
    }

    public function tearDown()
    {
        parent::tearDown();
        \Mockery::close();
    }

    public function test本の一覧を取得する() {
        factory(Book::class, 2)->create();

        $request = new Request();
        $response = \App::make(BookController::class)->index($request);
        $this->assertEquals(200, $response->status());
        $this->assertEquals(2, count($response->getData()->data));
    }

    public function test本の一覧を検索する() {
        factory(Book::class, 2)->create(['name' => 'matching title', 'genre_id' => 1]);

        // matching title & genre
        $request = new Request(['q' => 'matching title', 'genres' => [1]]);
        $response = \App::make(BookController::class)->index($request);
        $this->assertEquals(200, $response->status());
        $this->assertEquals(2, count($response->getData()->data));

        // not matching genre
        $request = new Request(['q' => 'matching title', 'genres' => [2]]);
        $response = \App::make(BookController::class)->index($request);
        $this->assertEquals(200, $response->status());
        $this->assertEquals(0, count($response->getData()->data));

        // not matching title
        $request = new Request(['q' => 'not matching title', 'genres' => [1]]);
        $response = \App::make(BookController::class)->index($request);
        $this->assertEquals(200, $response->status());
        $this->assertEquals(0, count($response->getData()->data));
    }

    public function test本の詳細を取得する() {
        $this->book = factory(Book::class)->create();
        $this->userBook = factory(UserBook::class)->create(['book_id' => $this->book->id]);
        $this->review = factory(Review::class)->create([
            'user_book_id' => $this->userBook->id,
            'user_id' => 1
        ]);

        $response = \App::make(BookController::class)->show($this->book);
        $this->assertEquals(200, $response->status());
    }
}
