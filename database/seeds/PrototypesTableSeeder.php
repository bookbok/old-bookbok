<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Book;
use App\UserBook;
use App\Review;

class PrototypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->nakka();
        $this->sugino();
        $this->kento();
        $this->yrtmeci();
        $this->oya();
        $this->akari();
    }

    public function insertBoks($boks, $userId, $userBookId) {
        for($i = 0; $i < count($boks); $i++) {
            $boks[$i] += [ 'user_book_id' => $userBookId, 'user_id' => $userId, ];
        }
        DB::table('boks')->insert($boks);
    }

    private function sugino() { }
    private function kento() { }
    private function yrtmeci() { }
    private function oya() { }
    private function akari() { }

    private function nakka() {
        $user = User::create([
            'name' => 'NAKKA-K',
            'email' => 'nakka@example.com',
            'password' => bcrypt('password'),
            'role_id' => 10,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
        ]);

        $book = Book::create([
            'isbn' => '',
            'name' => '',
            'description' => '',
            'cover' => 'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            'author' => '織田信長',
            'genre_id' => 1,
        ]);

        // don't touch
        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => '',
        ]);

        $boks = [
            [
                'body' => 'a',
                'page_num_begin' => 1,
                'page_num_end' => 1,
                'line_num' => 1,
                'published_at' => \Carbon\Carbon::now(),
            ],
            [
                'body' => 'b',
                'page_num_begin' => 1,
                'page_num_end' => 1,
                'line_num' => 1,
                'published_at' => \Carbon\Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }
}
