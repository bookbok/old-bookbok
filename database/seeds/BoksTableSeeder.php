<?php

use Illuminate\Database\Seeder;

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
        $userBooks = App\UserBook::all();
        foreach($userBooks as $book) {
            for($i = 0; $i < rand(0, 10); $i++) {
                factory(App\Bok::class, 10)->create([
                    'book_user_id' => $book->id,
                    'user_id' => $book->user_id,
                ]);
            }
        }
    }
}
