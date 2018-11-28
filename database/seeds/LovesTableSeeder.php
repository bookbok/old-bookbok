<?php

use Illuminate\Database\Seeder;

class LovesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminUser = App\User::find(1);
        // bokのlove数、一般ユーザーからの見え方をテストしたい
        $normalUser = App\User::find(5);
        $boks = App\Bok::take(10)->get();

        foreach($boks as $bok) {
            App\Love::create([
                'user_id' => $adminUser->id,
                'bok_id' => $bok->id,
            ]);

            App\Love::create([
                'user_id' => $normalUser->id,
                'bok_id' => $bok->id,
            ]);
        }
    }
}
