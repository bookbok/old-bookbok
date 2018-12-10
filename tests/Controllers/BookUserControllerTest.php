<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\UserBook;
use App\Book;
use GuzzleHttp\Client;

class UserBookControllerTest extends TestCase
{

    /** @var CuzzleHttp\Client */
    private $client;

    /** @var int */
    private $countBook;
    private $countUserBook;

    public function setUp(){

        parent::setUp();

        //　php artisan migrate:refresh --seed の実行
        \Artisan::call('migrate:refresh');
        \Artisan::call('db:seed');

        // 現状のレコード数を計算する
        $this->countUserBook = count(UserBook::all());
        $this->countBook = count(Book::all());
    }

    public function tearDown(){
        //　php artisan migrate:refresh --seed の実行
        \Artisan::call('migrate:refresh');
        \Artisan::call('db:seed');
    }

    /**
     * @test
     */
    public function BOOKに登録されていないISBNを入力されたとき、および登録されているISBNを入力されたときのテスト(){

        $client = new Client();

        //　登録前
        $client->request(
            'POST',
            'http://localhost:8000/api/users/1/user_books',
            ['form_params' =>
                [
                    'isbn' => '9784063842760'
                ]
            ]
        );

        // チェック
        $this->countUserBook++;
        $this->countBook++;
        $this->assertEquals($this->countUserBook, count(UserBook::all()));
        $this->assertEquals($this->countBook, count(Book::all()));


        //　登録後
        $client->request(
            'POST',
            'http://localhost:8000/api/users/2/user_books',
            ['form_params' =>
                [
                    'isbn' => '9784063842760'
                ]
            ]
        );

        // チェック
        $this->countUserBook++;
        $this->assertEquals($this->countUserBook, count(UserBook::all()));
        $this->assertEquals($this->countBook, count(Book::all()));

    }
}
