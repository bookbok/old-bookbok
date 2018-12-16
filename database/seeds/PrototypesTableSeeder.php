<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Book;
use App\UserBook;
use App\Review;
use Carbon\Carbon;

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
            'genre_id' => 4,
        ]);

        // don't touch
        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => 'この作品は私が一番大嫌いで、一番面白いと思った作品の1つだ。\n表紙を見るだけで色々な物語が見えてくる。',
        ]);

        $boks = [
            [
                'body' => '最初の1ページ目に書かれた文章から、一気に物語に引き込まれるような情景の伝え方が素晴らしい！！！\nこれぞ新海誠の世界観、ここにありという文章。\nこうして読みながらBokを書きながらその情景を思い浮かべるだけで頭の中で世界観がどんどん広がっていく。',
                'page_num_begin' => 7,
                'page_num_end' => 1,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「めまいがするような高鳴りを覚えながら、僕は初めてこの世界は怖くない、と感じていた。」\nこの文章読んだ瞬間、息がつまるようななんとも言えない感情を覚えた。ただ、この文章がとても好きだと言うことはたしかだった。',
                'page_num_begin' => 14,
                'page_num_end' => 14,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「貴樹くん、ごめんね」\nこのセリフを見た瞬間私は察した。\n同時に続きを読むのが怖くなった。それでも読みたいと言う気持ちが読み進める手を止めてくれない。',
                'page_num_begin' => 16,
                'page_num_end' => 16,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '子供が親の都合で大事な友達と離れ離れにさせられるなど、絶対にあってはいけないことなんだ。子供の頃に3度の転校を経験した私は、再度強く認識した。',
                'page_num_begin' => 19,
                'page_num_end' => 19,
                'line_num' => 7,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'ポケットからこぼれ出た手紙が風邪で飛ばされてしまった時には、体が反射的に強張ってしまうくらいの苦しみを覚えた。',
                'page_num_begin' => 40,
                'page_num_end' => 41,
                'line_num' => 24,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「永遠とか心とか魂とか言うものがどこにあるのか、分かった気がした。」\n!!!!!!!!!!!!!',
                'page_num_begin' => 50,
                'page_num_end' => 50,
                'line_num' => 0,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '子供の頃のあまりの力のなさは、今だからこそ分かる。その力の無さを親が補ってやらなければ、子供だけで生きていくには厳しすぎる現実だ。',
                'page_num_begin' => 54,
                'page_num_end' => 54,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '貴樹が高校になっても朝から部活練習を一人だろうとしているのは、やはり何もしていない時間を無くしたいからなのだろう。',
                'page_num_begin' => 61,
                'page_num_end' => 61,
                'line_num' => 0,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「その人と一緒にいる時間は全力で相手のことだけを見ていよう。携帯なんか絶対に見ないようにしよう。不安を相手に与えない人間になろう」\n現代人には非常に心苦しい言葉ではあるが、でも実際のところそれが良いのだろうとはっきり分かる。',
                'page_num_begin' => 74,
                'page_num_end' => 74,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '将来が決まっていない高校生は多いだろう。大人になったって決まっていない人いっぱいいる。それでも生きていかなくちゃならない。\n「一つずつできることからやるの。」\nやっぱり一つずつ着実にやっていくって言うのは重要なことなんだろう。\n\nエンジニアリングの用語を借りるなら、アジャイルでPDCAを回して行こうと言うことだ。',
                'page_num_begin' => 95,
                'page_num_end' => 95,
                'line_num' => 4,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「そしてその朝、私は波の上に立った。ウソみたいに唐突に、文句のつけようもなく完璧に。」\n人生の成功はいつも唐突にやってくる。日頃の意味のないように見えた積み重ねが、気づかないうちに全てその瞬間のために積み上がっているのだ。',
                'page_num_begin' => 96,
                'page_num_end' => 96,
                'line_num' => 7,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'この時代(平成十数年代)にはWebなんてそんなになくて、WindowsAPIのようなOSへのAPIを叩いてネイティブのデスクトップアプリを作るといったことがスタンダードだったんだな。と至極当たり前のことを考えながら、平成30年との間に横たわる茫漠とした大きな時間を感じた。',
                'page_num_begin' => 132,
                'page_num_end' => 132,
                'line_num' => 0,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「料理の音とキーを叩く音が小さな部屋を優しく満たしていて、それは彼の知るかぎり、最も心休まる空間であり時間であった。」\n日常にある小さな幸せとも言うようなひと時が心を休める',
                'page_num_begin' => 148,
                'page_num_end' => 148,
                'line_num' => 2,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人生とは多くの奇蹟でできている。悪いことも良いことも全て含めて奇蹟なのだ。結局どれだけ大人になろうとも、「一つずつできることからやる」のだ......',
                'page_num_begin' => 184,
                'page_num_end' => 184,
                'line_num' => 0,
                'published_at' => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }
}
