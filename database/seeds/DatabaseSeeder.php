<?php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard(); //Eloquent の Mass Assignment制約を解除

        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(GenresTableSeeder::class);

        // プロトタイプ用に作ったSeeder
        $this->call(PrototypesTableSeeder::class);

        Model::reguard(); //再設定
    }
}
