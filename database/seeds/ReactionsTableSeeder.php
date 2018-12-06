<?php

use Illuminate\Database\Seeder;
use App\Reaction;

class ReactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = App\User::find(1);
        // bokの良いね数、一般ユーザーからの見え方をテストしたい
        $normalUser = App\User::find(5);
        $boks = App\Bok::take(10)->get();

        foreach($boks as $bok) {
            Reaction::create([
                'user_id' => $adminUser->id,
                'bok_id' => $bok->id,
                'liked' => true,
                'loved' => true,
            ]);

            // テスト用として、likeしているものとloveしているデータをランダムに用意している
            Reaction::create([
                'user_id' => $normalUser->id,
                'bok_id' => $bok->id,
                'liked' => $this->randomBool($bok->id),
                'loved' => !$this->randomBool($bok->id),
            ]);
        }
    }

    private function randomBool($num) {
        return $num % 2 == 0;
    }
}
