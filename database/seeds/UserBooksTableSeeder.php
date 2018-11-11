<?php

use Illuminate\Database\Seeder;

class UserBooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // HACK: BooksTableSeederで10個のBookが生成されていることを前提としている
        DB::table('user_book')->insert([
            [
                'user_id' => 1,
                'book_id' => 1,
            ],
            [
                'user_id' => 1,
                'book_id' => 2,
            ],
            [
                'user_id' => 1,
                'book_id' => 9,
            ],
            [
                'user_id' => 1,
                'book_id' => 6,
            ],
        ]);
    }
}
