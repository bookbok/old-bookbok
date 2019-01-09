<?php

use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert([
            ['name' => '漫画'],
            ['name' => '語学・学習参考書'],
            ['name' => '絵本・児童書・図鑑'],
            ['name' => '小説・エッセイ'],
            ['name' => 'パソコン・システム開発'],
            ['name' => 'ビジネス・経済・就職'],
            ['name' => '旅行・留学・アウトドア'],
            ['name' => '人文・思想・社会'],
            ['name' => 'ホビー・スポーツ・美術'],
            ['name' => '美容・暮らし・健康・料理'],
            ['name' => 'エンタメ・ゲーム'],
            ['name' => '科学・技術'],
            ['name' => '写真集・タレント'],
            ['name' => 'その他'],// MEMO:楽天レスポンスのid調整のために必要な埋め草的レコード。消すとidがズレる。唱えてはいけない滅びの呪文。
            ['name' => 'その他'],
            ['name' => '資格・検定'],
            ['name' => 'ライトノベル'],
            ['name' => '楽譜'],
            ['name' => '文庫'],
            ['name' => '新書'],
            ['name' => 'ボーイズラブ（BL）'],
            ['name' => '付録付き'],
            ['name' => 'バーゲン本'],
            ['name' => 'コミックセット'],
            ['name' => 'カレンダー・手帳・家計簿'],
            ['name' => '文具・雑貨'],
            ['name' => '医学・薬学・看護学・歯科学'],
        ]);
    }
}
