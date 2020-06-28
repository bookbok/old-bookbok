<?php

use Illuminate\Database\Seeder;
use App\Models\Reaction;
use App\Models\User;
use App\Models\Bok;

class ReactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = User::find(1);
        // bokの良いね数、一般ユーザーからの見え方をテストしたい
        $normalUser = User::find(5);
        $boks = Bok::take(10)->get();

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
