<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'id' => Role::ADMIN,
                'name' => 'admin'
            ],
            [
                'id' => Role::STAFF,
                'name' => 'staff'
            ],
            [
                'id' => Role::NORMAL,
                'name' => 'normal'
            ]
        ]);
    }
}
