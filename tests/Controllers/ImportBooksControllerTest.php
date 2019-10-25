<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\ImportBooksController;
use App\User;
use App\Book;
use App\Http\Requests\BokRequest;
use App\Components\BookInfoScraper\ScrapeManager;
use App\Http\Requests\ImportBookRequest;

class ImportBooksControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }

    public function test本をまとめて登録する() {
        $this->actingAs($this->user, 'api');

        $newBook = factory(Book::class)->make(['isbn' => '4775941151']);
        $mock = \Mockery::mock(ScrapeManager::class)
            ->shouldReceive('searchByIsbn')
            ->andReturn($newBook)
            ->getMock();
        $this->app->bind('app.bookInfo.scrapeManager', function() use ($mock) {
            return $mock;
        });

        $existBook = factory(Book::class)->create(['isbn' => '9784774145808']);
        $request = new ImportBookRequest(['isbnList' => ['9784774145808', '4775941151']]);
        $response = \App::make(ImportBooksController::class)->store($request);
        $this->assertEquals(201, $response->status());
    }
}

