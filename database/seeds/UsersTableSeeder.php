<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // created_at, updated_at is random
        App\User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => '$2y$10$nYDttVj18d/LVbcug0P70Ot8bvNTdBloQHRhGLdngo7z3jD8hL72u',
            'role_id' => 1,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
            'created_at' => Carbon::now()->subDays(32),
            'updated_at' => Carbon::now()->subDays(32),
        ]);

        App\User::create([
            'name' => 'test-staff',
            'email' => 'staff@example.com',
            'password' => '$2y$10$nYDttVj18d/LVbcug0P70Ot8bvNTdBloQHRhGLdngo7z3jD8hL72u',
            'role_id' => 5,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
            'created_at' => Carbon::now()->subDays(32),
            'updated_at' => Carbon::now()->subDays(32),
        ]);
    }
}
