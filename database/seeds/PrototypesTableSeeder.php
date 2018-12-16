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

    private function sugino() {
        $user = User::create([
            'name' => 'SUGINO',
            'email' => 'sugino@example.com',
            'password' => bcrypt('password'),
            'role_id' => 10,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
        ]);
         $book = Book::create([
            'isbn' => '9784534031730',
            'name' => '社会学がわかる事典',
            'description' => '現代社会のあらゆる事象を、独自の視点から知的に読み解く社会学。本書は、その基本から最新学説までを、どの本よりもわかりやすく解説。自分を見つめるよすがとして、教養として、またはじめて社会学を学ぶ入門書として、社会学のエッセンスをコンパクトに凝縮した、楽しく手軽に読める本である。',
            'cover' => 'http://books.google.com/books/content?id=mWyWAAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            'author' => '森下伸也',
            'genre_id' => 8,
        ]);

        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

         Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => '社会学は面白い分野なのだな、とひしと感じた。人と人が交わるケースであれば、どこにでもメスを入れていくあくなき人への探求心が根底にあり、その探求心が解き明かした回答をここに見ることができる。「遊び」によってつくられた、人類の現時点における自分たち自身への回答を知ることはとてもワクワクする体験だった。',
        ]);

         $boks = [
            [
                'body' => '人間の行動は「刺激⇒意味付け⇒反応」という構造をもつと仮定すると、その「意味付け」の部分が文化であったり家庭環境であったり、人に個性を持たせうる部分になるんだろうな。そう考えたら、教育って人の行動に直結するとも言えるわけか。',
                'page_num_begin' => 30,
                'page_num_end' => 30,
                'line_num' => 23,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人間の行為には二種類あるらしい。行為そのものが目的のものと、行為の先に別の目的があるもの。文明が発展すればするほど、どんどん行為の先の先の先の......果てない先の目的に到達しなきゃいけないからしんどそう。特に技術ってそう。',
                'page_num_begin' => 33,
                'page_num_end' => 33,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '文明のパラドックスか。文明が高度化すればするほど、生活は豊かになって、即座に欲求が満たされることが多くなる。最近だとスマホとかそれね。スマホのレスポンスの早さになれると我慢や忍耐がなくなりそうで怖い。',
                'page_num_begin' => 36,
                'page_num_end' => 36,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人間は比較の中を生きている。その比較の対象とする集団のことを準拠集団と呼び、だいたい自分と馴染みのある集団を選ぶらしい。まあ、言われてみれば住む世界が違うような人が所属する集団を自分を量る物差しにはしないわな......。',
                'page_num_begin' => 42,
                'page_num_end' => 42,
                'line_num' => 5,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '社会規範はむしろ生きることを楽にしてくれているのかもしれない。「こうしなければならない」というルールがあるおかげで自分で考えなければならないケースが劇的に減る。社会規範による負担免除。',
                'page_num_begin' => 47,
                'page_num_end' => 47,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人は、地位にふさわしい役割を果たしてくれることを期待する。つまり、言葉にはしないが「〇〇してくれるだろう」という言外の期待があるわけだ。ただ、最近の期待は、明らかに地位に見合わない、高いレベルのものを要求するようになってきている気がする。',
                'page_num_begin' => 60,
                'page_num_end' => 61,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '効率よく目的を達成するには、それに必要な仕事を手分けしてやらなければならない。それが分業と呼ばれるもので、分業には水平的分業と垂直的分業がある。IT業界においては、さらに横断的分業が存在している（ような気がする）。',
                'page_num_begin' => 80,
                'page_num_end' => 80,
                'line_num' => 4,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '個々の活動量が目標達成の可否を直接に左右するような小規模な集団では、貢献度の高い個人が覇権を握りやすい環境にある。これはベンチャー企業のような存在にも当てはまるだろう。必要悪か？度が過ぎると宗教集団と化す。',
                'page_num_begin' => 86,
                'page_num_end' => 86,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'もちつもたれつの関係で成り立っている社会を調和的社会観と呼び、対照的に、強者が弱者を組み敷いているいる状態にすぎないとする見方を闘争的社会観と呼ぶ。機能分化によってシステムが支えられているのであれば、役割の期待が大きい地位についた人間、集団に権限が集中するのは不可避ではないのか？',
                'page_num_begin' => 106,
                'page_num_end' => 106,
                'line_num' => 8,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '産業社会のいちばん大きな特徴は、いちじるしい機能分化にあるらしい。ほかの特徴としては、家族と経営の分離、都市化、科学技術の制度化と爆発的発展。まあ、確かにその通り。で、産業社会が成熟したらその次はどうなるの？',
                'page_num_begin' => 130,
                'page_num_end' => 131,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'オルテガの「大衆の反逆」きたこれ。大衆とは、個性がなく、他律的で、理想や使命感とは無縁で、文明の恩恵が自動的に享受できると思っており、自分たちが一番偉いと思い、自分たちのわがままをどこでも押し通そうとする。精神性のかけらもない。はい、ボロクソきました。',
                'page_num_begin' => 136,
                'page_num_end' => 136,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人はなぜ群れたがるのか。これは、似た者同士が集合することによって生じる感情の高ぶり「集合的沸騰」によって説明することができる。自我と自我との間の壁が壊され、自分という存在が他者を通してどこまでも拡大されていくことに幸福を感じるのだとか。夫婦は自分にないものを相手に求めたりするけど、友人関係って多数が似た者同士なのも、集合的沸騰という快楽を追求する人間の性なのかもしれないね。',
                'page_num_begin' => 157,
                'page_num_end' => 157,
                'line_num' => 8,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '電子メディアが発達すると、人間の知覚や社会的関係が劇的に変化する。コミュニケーション可能な範囲が地球規模に拡大される。地球村の誕生である。',
                'page_num_begin' => 163,
                'page_num_end' => 164,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人はなぜ遊ぶのだろうか。この疑問について、ホイジンガとカイヨワが一つの回答を出している。端的に言えば、エネルギーがありあまっていて、自分の技術、知識、身体、精神的能力をめいっぱい無駄遣いしたいらしい。こういう無駄遣いが文化をつくり、現代をつくっていると考えると面白い。',
                'page_num_begin' => 172,
                'page_num_end' => 172,
                'line_num' => 7,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '少子化はなぜ進むのか？日本が直面している問題。その背後には各国共通した背景があるようだ。１．女性の高学歴化と社会進出。２．結婚すれば出産するもという自明性の崩壊と自由な選択。３．快楽主義的な価値観の浸透。うん......どうしようもなくない？',
                'page_num_begin' => 200,
                'page_num_end' => 201,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '医学の発展とともに、人の誕生と死は病院に囲い込まれ、乳幼児の死亡率は劇的に低下した。都市化とともに、近隣住民との関係は希薄になり、葬儀は葬儀屋がしきるようになった。その結果、死は人にとってなじみのないものになってしまった。「死」を口にすることが嫌がられるのは、こうした背景があるようだ。なじみがなければ、人は不安になる。',
                'page_num_begin' => 210,
                'page_num_end' => 210,
                'line_num' => 8,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '生産物からの疎外。現代社会でこれを解決するのは容易ではないだろう。作ったものが労働者の手元を離れ、自己疎外が進み、やがて労働が苦痛以外のなにものでもなくなる。',
                'page_num_begin' => 248,
                'page_num_end' => 249,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }

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
