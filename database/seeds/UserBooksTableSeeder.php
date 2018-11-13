<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

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
        DB::table('book_user')->insert([
            [
                'user_id' => 1,
                'book_id' => 1,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            [
                'user_id' => 1,
                'book_id' => 2,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'user_id' => 1,
                'book_id' => 9,
                'created_at' => Carbon::now()->subDays(4),
                'updated_at' => Carbon::now()->subDays(4),
            ],
            [
                'user_id' => 1,
                'book_id' => 6,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
