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
            'isbn' => '9784041026168',
            'name' => '小説秒速5センチメートル',
            'description' => '「桜の花びらの落ちるスピードだよ。秒速5センチメートル」いつも大切なことを教えてくれた明里、そんな彼女を守ろうとした貴樹。小学校で出会った2人は中学で離ればなれになり、それぞれの恋心と魂は彷徨を続けていく―。劇場アニメーション『秒速5センチメートル』では語られなかった彼らの心象風景を、新海誠監督みずからが繊細な筆致で小説化。1人の少年を軸に描かれる、3つの連作短編を収録する。',
            'cover' => 'https://cover.openbd.jp/9784041026168.jpg',
            'author' => '新海誠',
            'genre_id' => 8,
        ]);

        // don't touch
        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => 'この作品は私が一番大嫌いで、一番面白いと思った作品の1つだ。',
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
