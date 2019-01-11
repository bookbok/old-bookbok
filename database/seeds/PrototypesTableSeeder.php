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
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 10,
            'avatar' => 'https://avatars0.githubusercontent.com/u/29668738',
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
                'page_num_end' => null,
                'line_num' => 23,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人間の行為には二種類あるらしい。行為そのものが目的のものと、行為の先に別の目的があるもの。文明が発展すればするほど、どんどん行為の先の先の先の......果てない先の目的に到達しなきゃいけないからしんどそう。特に技術ってそう。',
                'page_num_begin' => 33,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '文明のパラドックスか。文明が高度化すればするほど、生活は豊かになって、即座に欲求が満たされることが多くなる。最近だとスマホとかそれね。スマホのレスポンスの早さになれると我慢や忍耐がなくなりそうで怖い。',
                'page_num_begin' => 36,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人間は比較の中を生きている。その比較の対象とする集団のことを準拠集団と呼び、だいたい自分と馴染みのある集団を選ぶらしい。まあ、言われてみれば住む世界が違うような人が所属する集団を自分を量る物差しにはしないわな......。',
                'page_num_begin' => 42,
                'page_num_end' => null,
                'line_num' => 5,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '社会規範はむしろ生きることを楽にしてくれているのかもしれない。「こうしなければならない」というルールがあるおかげで自分で考えなければならないケースが劇的に減る。社会規範による負担免除。',
                'page_num_begin' => 47,
                'page_num_end' => null,
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
                'page_num_end' => null,
                'line_num' => 4,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '個々の活動量が目標達成の可否を直接に左右するような小規模な集団では、貢献度の高い個人が覇権を握りやすい環境にある。これはベンチャー企業のような存在にも当てはまるだろう。必要悪か？度が過ぎると宗教集団と化す。',
                'page_num_begin' => 86,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'もちつもたれつの関係で成り立っている社会を調和的社会観と呼び、対照的に、強者が弱者を組み敷いているいる状態にすぎないとする見方を闘争的社会観と呼ぶ。機能分化によってシステムが支えられているのであれば、役割の期待が大きい地位についた人間、集団に権限が集中するのは不可避ではないのか？',
                'page_num_begin' => 106,
                'page_num_end' => null,
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
                'page_num_end' => null,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人はなぜ群れたがるのか。これは、似た者同士が集合することによって生じる感情の高ぶり「集合的沸騰」によって説明することができる。自我と自我との間の壁が壊され、自分という存在が他者を通してどこまでも拡大されていくことに幸福を感じるのだとか。夫婦は自分にないものを相手に求めたりするけど、友人関係って多数が似た者同士なのも、集合的沸騰という快楽を追求する人間の性なのかもしれないね。',
                'page_num_begin' => 157,
                'page_num_end' => null,
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
                'page_num_end' => null,
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
                'page_num_end' => null,
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

    private function kento() {
        $user = User::create([
            'name'      => 'kento-oka',
            'email'     => 'kento-oka@example.com',
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id'   => 10,
            'avatar'    => 'https://avatars0.githubusercontent.com/u/30544668',
        ]);

        $book = Book::create([
            'isbn'        => '9784150311193',
            'name'        => 'リライト',
            'description' => '過去は変わらないはずだった―1992年夏、未来から来たという保彦と出会った中学2年の美雪は、旧校舎崩壊事故から彼を救うため10年後へ跳んだ。2002年夏、作家となった美雪はその経験を元に小説を上梓する。彼と過ごした夏、時を超える薬、突然の別れ...しかしタイムリープ当日になっても10年前の自分は現れない。不審に思い調べるなかで、美雪は記憶と現実の違いに気づき...SF史上最悪のパラドックスを描く第1作。',
            'cover'       => 'https://cover.openbd.jp/9784150311193.jpg',
            'author'      => '法条遥／著',
            'genre_id'    => 16,
        ]);

        // don't touch
        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id'      => $user->id,
            'body'         => 'リビジョン・リアクト・リライブへと続くリ-シリーズの第1作。\nとにかく読み進めながら感じる微妙な違和感や不穏な空気など、一気に読み進めてしまわないと気がすまなくなってしまうような物語だった。\n\n次から次へと視点や時間が切り替わり、何度も前のページん戻るなどのタイムリープを経験した。時間がかかわる物語が好きな人にはおすすめのシリーズ。',
        ]);

        $boks = [
            [
                'body'           => '時間が絡む物語だ！これは徹夜コースだな。',
                'page_num_begin' => 1,
                'page_num_end'   => null,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => 'さあ過去が変わったぞ。どう進んでいくんだ',
                'page_num_begin' => 10,
                'page_num_end'   => 10,
                'line_num'       => 8,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => '「保彦が証明のために未来からとってきた新聞。これはそうなる運命だった」つまりこの物語の時間というものは過去から未来へ流れる確定した一本の軸ということか。',
                'page_num_begin' => null,
                'page_num_end'   => 38,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => 'ドラえもん300年も続くのか...。超ご長寿番組だなw',
                'page_num_begin' => null,
                'page_num_end'   => null,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => 'きたー！タイムリープもの定番のラベンダーの香り',
                'page_num_begin' => 48,
                'page_num_end'   => null,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => 'ここで本が作られるのか',
                'page_num_begin' => 98,
                'page_num_end'   => 100,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => 'さあ変わるはずのない過去が変わりだして、過去が未来へ影響しはじめたぞ',
                'page_num_begin' => 115,
                'page_num_end'   => null,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
            [
                'body'           => '最後まで読んでしまった。なんやこれ最高かよ',
                'page_num_begin' => 282,
                'page_num_end'   => null,
                'line_num'       => null,
                'published_at'   => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }

    private function yrtmeci() {
        $user = User::create([
            'name' => 'kazuki',
            'email' => 'yrtmeci@example.com',
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 10,
            'avatar' => 'https://avatars0.githubusercontent.com/u/41029768',
        ]);

        $book = Book::create([
            'isbn' => '9784062209892',
            'name' => '図解仕事の基本社会人1年生大全',
            'description' => 'いまさら聞けない、社会人のビジネス常識がすぐわかる! 楽しく充実した仕事人生のために
            、段取りよくスマートに働くには?',
            'cover' => 'https://cover.openbd.jp/9784062209892.jpg',
            'author' => '北篠久美子',
            'genre_id' => 6,
        ]);

        // don't touch
        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => '文字ばかりでなく図があることで読み進めやすい。',
        ]);

        $boks = [
            [
                'body' => '仕事を始める前に「やりがい」を見つけておこうと思った。',
                'page_num_begin' => 20,
                'page_num_end' => 21,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人と話すときのさしすせそ。料理のやつですら危ういがしっかりと覚えようと思った。',
                'page_num_begin' => 60,
                'page_num_end' => null,
                'line_num' => 2,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '社内恋愛についても厳しく書かれていてリスクを事前に理解できる。周りの目もあるし多分無理だろう。',
                'page_num_begin' => 112,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '携帯のマナー違反。現代だからこそ身につけておかねばならない。',
                'page_num_begin' => 130,
                'page_num_end' => 131,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '一度投稿したら取り消せないからこそ気を付けたい。そんなSNSのマナーについて',
                'page_num_begin' => 156,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '今まで経験がなかった冠婚葬祭についてのマナー。いつ起こるかわからないから今のうちから学んでいて正解だ。',
                'page_num_begin' => 224,
                'page_num_end' => 241,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }

    private function oya() {
        $user = User::create([
            'name' => 'OYASAI',
            'email' => 'oyasai@example.com',
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 10,
            'avatar' => 'https://avatars3.githubusercontent.com/u/25961633',
        ]);

        $book = Book::create([
            'isbn' => '9784023332096',
            'name' => 'ハムスターがおしえるハムの本音',
            'description' => '鳴き声、しぐさ、体のヒミツなどについて、ハムスター自身が「ハム目線」で解説する実用書。',
            'cover' => 'https://books.google.co.jp/books/content?id=7Nx8tgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            'author' => '今泉忠明',
            'genre_id' => 9,
        ]);

        $userBook = UserBook::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);

        Review::create([
            'user_book_id' => $userBook->id,
            'user_id' => $user->id,
            'body' => 'ハムスターに対してと飼い主に対して、それぞれ面白おかしく「あの行動」についてのアドバイスが記述されていてる。ハムスターという生き物は小さいが故にまだまだ謎の多い生き物とされているが、この本一冊でちょっとしたしぐさ全てに意味があるということがわかり、面白いと思った。',
        ]);

        $boks = [
            [
                'body' => 'ハムスターは体調を隠す生き物とのこと。常日頃愛ハムの体調チェックはしとかないと。',
                'page_num_begin' => 26,
                'page_num_end' => null,
                'line_num' => 3,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '頬袋から餌をたくさん出し始めるハムスター。よくSNSなどで挙がっていたりしており、可愛いなあと思って見てたが実は敵から逃げる時の準備だとか。こういう行動もハムスターにとっては意味があるんだなあ。',
                'page_num_begin' => 44,
                'page_num_end' => null,
                'line_num' => 10,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'ハムスターの1日が絵図で描かれている。直感的でとてもわかりやすい図でハム飼い初心者さんにとっては嬉しい図だろうと思う。\nところでハムスターって半日も寝てるんだなあ・・・。',
                'page_num_begin' => 75,
                'page_num_end' => null,
                'line_num' => 10,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'ハムスターが定位置で小便をすることは知っていたが、巣箱やごはん皿から離れたところでするというのは初めて知った。',
                'page_num_begin' => 88,
                'page_num_end' => null,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'ハムスターは人間の心拍数の約6倍とのこと。\n私たち人間が少しだけと思って触れ合った時間はハムにとってはとても長いということが分かったので気をつけようと思った。',
                'page_num_begin' => 129,
                'page_num_end' => null,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'もともとハムスターの頬袋はただのシワだった。先祖のハムがこのシワに食べ物を詰めていった結果、巣穴と外との往復量が減り、これを繰り返すうちに今のほお袋ができたらしい。ハムスターは賢い！',
                'page_num_begin' => 180,
                'page_num_end' => null,
                'line_num' => 1,
                'published_at' => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }

    private function akari() {
        $user = User::create([
            'name' => 'AKARI-I',
            'email' => 'akari@example.com',
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 10,
            'avatar' => 'https://avatars0.githubusercontent.com/u/30049713?s=400&u=00ee60703f10456080bc172aad4a966c3c954d5e&v=4',
        ]);

        $book = Book::create([
            'isbn' => '9784344812758',
            'name' => 'ヘタリア ~axis powers~',
            'description' => '昔はすごく強かった。周りからはドイツ、イギリスより強いと思われていた。──でも　なんか違った。～そんなヘタリアとゆかいな世界の仲間たちの物語～',
            'cover' => 'https://cover.openbd.jp/9784344812758.jpg',
            'author' => '日丸屋秀和',
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
            'body' => 'ヘタリアといえばこれ！みたいな話が詰まってる。枢軸はもちろんなんだけど連合国のわちゃわちゃがひたすら可愛かった。',
        ]);

        $boks = [
            [
                'body' => 'マキャベリさんパートほんと好き',
                'page_num_begin' => 27,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'おじいちゃんがまだはっちゃけきれてなくて可愛い',
                'page_num_begin' => 30,
                'page_num_end' => 34,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '連合国きたぁぁぁぁ',
                'page_num_begin' => 47,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'フィンランドもいもい可愛い',
                'page_num_begin' => 125,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ]
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }

    private function nakka() {
        $user = User::create([
            'name' => 'NAKKA-K',
            'email' => 'nakka@example.com',
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
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
            'body' => 'この作品は私が一番大嫌いで、一番面白いと思った作品の1つだ。\n平成10年代付近の小学生から大人になるまでの、よくある実らない恋物語がテーマの作品。\n\nこの本の概要にも書かれているが、新海誠作品では十八番であるバットエンド作品になっている。\n主人公とヒロインは常に心のどこかでは繋がっているが、それでも子供達の無力さではどうにもならない巨大な時間、距離が二人を引き裂くという非常に悲しい物語。しかし、その物語の中にも日常的な小さな出来事や情景が浮かび上がってくる。その細かな描写から物語に引き込まれてしまうともう抜け出せない。\n今の本がありふれた世の中でもこんなにも心に残る作品はそう多くないだろう。もし日常物語を読めるなら一度この本を読んでほしいと思う。',
        ]);

        $boks = [
            [
                'body' => '最初の1ページ目に書かれた文章から、一気に物語に引き込まれるような情景の伝え方が素晴らしい！！！\nこれぞ新海誠の世界観、ここにありという文章。\nこうして読みながらBokを書きながらその情景を思い浮かべるだけで頭の中で世界観がどんどん広がっていく。',
                'page_num_begin' => 1,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「めまいがするような高鳴りを覚えながら、僕は初めてこの世界は怖くない、と感じていた。」\nこの文章読んだ瞬間、息がつまるようななんとも言えない感情を覚えた。ただ、この文章がとても好きだと言うことはたしかだった。',
                'page_num_begin' => 14,
                'page_num_end' => null,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「貴樹くん、ごめんね」\nこのセリフを見た瞬間私は察した。\n同時に続きを読むのが怖くなった。それでも読みたいと言う気持ちが読み進める手を止めてくれない。',
                'page_num_begin' => 16,
                'page_num_end' => null,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '子供が親の都合で大事な友達と離れ離れにさせられるなど、絶対にあってはいけないことなんだ。子供の頃に3度の転校を経験した私は、再度強く認識した。',
                'page_num_begin' => 19,
                'page_num_end' => null,
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
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '子供の頃のあまりの力のなさは、今だからこそ分かる。その力の無さを親が補ってやらなければ、子供だけで生きていくには厳しすぎる現実だ。',
                'page_num_begin' => 54,
                'page_num_end' => null,
                'line_num' => 11,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '貴樹が高校になっても朝から部活練習を一人だろうとしているのは、やはり何もしていない時間を無くしたいからなのだろう。',
                'page_num_begin' => 61,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「その人と一緒にいる時間は全力で相手のことだけを見ていよう。携帯なんか絶対に見ないようにしよう。不安を相手に与えない人間になろう」\n現代人には非常に心苦しい言葉ではあるが、でも実際のところそれが良いのだろうとはっきり分かる。',
                'page_num_begin' => 74,
                'page_num_end' => null,
                'line_num' => 6,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '将来が決まっていない高校生は多いだろう。大人になったって決まっていない人いっぱいいる。それでも生きていかなくちゃならない。\n「一つずつできることからやるの。」\nやっぱり一つずつ着実にやっていくって言うのは重要なことなんだろう。\n\nエンジニアリングの用語を借りるなら、アジャイルでPDCAを回して行こうと言うことだ。',
                'page_num_begin' => 95,
                'page_num_end' => null,
                'line_num' => 4,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「そしてその朝、私は波の上に立った。ウソみたいに唐突に、文句のつけようもなく完璧に。」\n人生の成功はいつも唐突にやってくる。日頃の意味のないように見えた積み重ねが、気づかないうちに全てその瞬間のために積み上がっているのだ。',
                'page_num_begin' => 96,
                'page_num_end' => null,
                'line_num' => 7,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => 'この時代(平成十数年代)にはWebなんてそんなになくて、WindowsAPIのようなOSへのAPIを叩いてネイティブのデスクトップアプリを作るといったことがスタンダードだったんだな。と至極当たり前のことを考えながら、平成30年との間に横たわる茫漠とした大きな時間を感じた。',
                'page_num_begin' => 132,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '「料理の音とキーを叩く音が小さな部屋を優しく満たしていて、それは彼の知るかぎり、最も心休まる空間であり時間であった。」\n日常にある小さな幸せとも言うようなひと時が心を休める',
                'page_num_begin' => 148,
                'page_num_end' => null,
                'line_num' => 2,
                'published_at' => Carbon::now(),
            ],
            [
                'body' => '人生とは多くの奇蹟でできている。悪いことも良いことも全て含めて奇蹟なのだ。結局どれだけ大人になろうとも、「一つずつできることからやる」のだ......',
                'page_num_begin' => 184,
                'page_num_end' => null,
                'line_num' => null,
                'published_at' => Carbon::now(),
            ],
        ];
        $this->insertBoks($boks, $user->id, $userBook->id);
    }
}
