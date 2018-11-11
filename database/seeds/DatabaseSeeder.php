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

        $this->call(UsersTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(BooksTableSeeder::class);
        $this->call(GenresTableSeeder::class);
        $this->call(UserBooksTableSeeder::class);

        Model::reguard(); //再設定
    }
}
