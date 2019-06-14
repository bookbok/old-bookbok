<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Components\BookInfoScraper\ScrapeManager;
use App\Http\Controllers\UserBookController;
use App\User;
use App\Book;
use App\UserBook;

class UserBookControllerTest extends TestCase
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

    /**
     * @test
     */
    public function BOOKに登録されていないISBNを入力されたとき、および登録されているISBNを入力されたときのテスト(){
        $this->actingAs($this->user, 'api');

        $request = new Request(['isbn' => '9784063842760']);
        $response = \App::make(UserBookController::class)->store($request, $this->user);
        $this->assertEquals(201, $response->status());
        $data = collect($response->getData());
        $this->assertTrue($data->has(['book', 'user', 'review', 'boks']));

        $response = \App::make(UserBookController::class)->store($request, $this->user);
        $this->assertEquals(409, $response->status());
    }
}
