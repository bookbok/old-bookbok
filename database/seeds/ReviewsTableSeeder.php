<?php

use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userBooks = App\UserBook::all();
        foreach($userBooks as $book) {
            factory(App\Review::class)->create(['user_book_id' => $book->id, 'user_id' => $book->user_id]);
        }
    }
}
