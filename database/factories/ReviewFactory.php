<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Review::class, function (Faker $faker) {
    $user = factory(App\User::class)->create();
    return [
        'user_id' => function () use ($user) {
            return $user->id;
        },
        'user_book_id' => function () use ($user) {
            return factory(App\UserBook::class)->create([
                'user_id' => $user->id,
            ])->id;
        },
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
    ];
});
