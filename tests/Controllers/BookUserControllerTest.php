<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\BookUser;
use App\Book;
use GuzzleHttp\Client;

class BookUserControllerTest extends TestCase
{

    /** @var CuzzleHttp\Client */
    private $client;

    /** @var int */
    private $countBook;
    private $countBookuser;

    public function setUp(){

        parent::setUp();

        //　php artisan migrate:refresh --seed の実行
        \Artisan::call('migrate:refresh');
        \Artisan::call('db:seed');

        // 現状のレコード数を計算する   
        $this->countBookuser = count(BookUser::all());
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
                    'book_id' => '9784063842760'
                ]
            ]
        );

        // チェック
        $this->countBookuser++;
        $this->countBook++;
        $this->assertEquals($this->countBookuser, count(BookUser::all()));
        $this->assertEquals($this->countBook, count(Book::all()));


        //　登録後
        $client->request(
            'POST',
            'http://localhost:8000/api/users/2/user_books',
            ['form_params' => 
                [
                    'book_id' => '9784063842760'
                ]
            ]
        );

        // チェック
        $this->countBookuser++;
        $this->assertEquals($this->countBookuser, count(BookUser::all()));
        $this->assertEquals($this->countBook, count(Book::all()));

    }
}
