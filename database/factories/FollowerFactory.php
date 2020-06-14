<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\Follower;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

/** @var Factory $factory */
$factory->define(Follower::class, function (Faker $faker) {
    return [
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'target_id' => function () {
            return factory(User::class)->create()->id;
        },
        'created_at' => now(),
        'updated_at' => now(),
    ];
});

