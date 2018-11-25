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
        $userBooks = App\BookUser::all();
        foreach($userBooks as $book) {
            factory(App\Review::class)->create(['book_user_id' => $book->id, 'user_id' => $book->user_id]);
        }
    }
}
