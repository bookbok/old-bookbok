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
        $books = App\Book::orderBy('created_at')->take(5)->get();
        foreach($books as $book) {
            App\BookUser::create([
                'user_id' => 1,
                'book_id' => $book->isbn,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ]);
        }
    }
}
