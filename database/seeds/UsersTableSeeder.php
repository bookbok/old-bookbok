<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);

        App\User::create([
            'name' => 'test-user',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}
