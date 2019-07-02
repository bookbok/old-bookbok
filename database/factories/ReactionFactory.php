<?php

use Faker\Generator as Faker;

$factory->define(App\Reaction::class, function (Faker $faker) {
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

