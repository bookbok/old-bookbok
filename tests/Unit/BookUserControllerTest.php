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
    

    /**
     * 
     * 
     */
    public function setup(){
        // 必須の呼び出し
        parent::setUp();

        // モデルのリフレッシュ
        \Artisan::call('migrate:refresh');
        \Artisan::call('db:seed');
    }

    /**
     * 
     * 
     */
    public function tearDown(){

    }

    /**
     * @test
     * 
     */
    public function BOOKに登録されているISBNを入力されたときのテスト(){
        // 現状のレコード数を計算する   
        $count_bookuser = count(BookUser::all());
        $count_book = count(Book::all());

        

        // チェック
        // $this->assertTag(array('tag' => 'strong', 'content' =>'Success'),$response->body->__toString());
        // $this->assertEquals($count_bookuser + 1, count(BookUser::all()));
        // $this->assertEquals($count_book + 1, count(Book::all()));

    }

    // /**
    //  * @test
    //  * 
    //  */
    // public function BOOKに登録されていないISBNを入力されたときのテスト(){
    //     // 現状のレコード数を計算する   
    //     $count_bookuser = count(BookUser::all());
    //     $count_book = count(Book::all());

    //     // 入力値を直接指定(存在していない)
    //     $_POST["book_id"] = "9784844339458";
    // }
}
