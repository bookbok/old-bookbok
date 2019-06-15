<?php

use Faker\Generator as Faker;

$factory->define(App\UserBook::class, function (Faker $faker) {
    return [
        'book_id' => function () {
            return factory(App\Book::class)->create()->id;
        },
        'user_id' => function () {
            return factory(App\User::class)->create()->id;
        },
        'created_at' => now(),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
