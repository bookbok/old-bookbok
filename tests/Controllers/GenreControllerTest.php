<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;

use App\Http\Controllers\GenreController;
use App\Models\Genre;

class GenreControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testジャンルの一覧を取得する() {
        factory(Genre::class, 2)->create();

        $response = \App::make(GenreController::class)->index();
        $this->assertEquals(200, $response->status());
        $this->assertEquals(2, count($response->getData()));
    }

    public function testジャンルの詳細を取得する() {
        $genre = factory(Genre::class)->create();

        $response = \App::make(GenreController::class)->show($genre);
        $this->assertEquals(200, $response->status());
    }
}

