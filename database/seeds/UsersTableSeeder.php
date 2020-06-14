<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\User;

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
        User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'email_verified_at' => Carbon::now()->subDays(1),
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 1,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
            'created_at' => Carbon::now()->subDays(32),
            'updated_at' => Carbon::now()->subDays(32),
        ]);

        User::create([
            'name' => 'test-staff',
            'email' => 'staff@example.com',
            'email_verified_at' => Carbon::now()->subDays(1),
            'password' => '$2y$10$2e6j5ZXZXklk5Hs.8VpyZOovlXhW4OsXu3Ut/CTOi5Nry39GRQLIu',
            'role_id' => 5,
            'avatar' => 'https://avatars0.githubusercontent.com/u/22770924',
            'created_at' => Carbon::now()->subDays(32),
            'updated_at' => Carbon::now()->subDays(32),
        ]);
    }
}
