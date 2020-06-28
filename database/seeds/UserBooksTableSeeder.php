<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Book;
use App\Models\UserBook;

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
        $books = Book::orderBy('created_at')->take(5)->get();
        foreach($books as $book) {
            UserBook::create([
                'user_id' => 1,
                'book_id' => $book->id,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ]);
        }
    }
}
