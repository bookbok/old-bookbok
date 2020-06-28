<?php

use Illuminate\Database\Seeder;
use App\Models\UserBook;
use App\Models\Review;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userBooks = UserBook::all();
        foreach($userBooks as $book) {
            factory(Review::class)->create(['user_book_id' => $book->id, 'user_id' => $book->user_id]);
        }
    }
}
