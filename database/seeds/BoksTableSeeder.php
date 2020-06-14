<?php

use Illuminate\Database\Seeder;
use App\Models\UserBook;
use App\Models\Bok;

class BoksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // userBookそれぞれに0~10個のbokを作成する
        $userBooks = UserBook::all();
        foreach($userBooks as $book) {
            for($i = 0; $i < rand(0, 10); $i++) {
                factory(Bok::class, 10)->create([
                    'user_book_id' => $book->id,
                    'user_id' => $book->user_id,
                ]);
            }
        }
    }
}
