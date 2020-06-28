<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\Reaction;

/** @var Factory $factory */
$factory->define(Reaction::class, function (Faker $faker) {
    return [
        'bok_id' => function () {
            return factory(App\Bok::class)->create()->id;
        },
        'user_id' => function () {
            return factory(App\User::class)->create()->id;
        },
        'liked' => true,
        'loved' => true,
        'created_at' => now(),
        'updated_at' => now(),
    ];
});

