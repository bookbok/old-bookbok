<?php

use Illuminate\Database\Seeder;

class LikesTableSeeder extends Seeder
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
            App\Like::create([
                'user_id' => $adminUser->id,
                'bok_id' => $bok->id,
            ]);

            App\Like::create([
                'user_id' => $normalUser->id,
                'bok_id' => $bok->id,
            ]);
        }
    }
}
