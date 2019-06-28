<?php

use Faker\Generator as Faker;

$factory->define(App\Bok::class, function (Faker $faker) {
    $pageEnd = $faker->numberBetween($min = 1, $max = 1000);
    $user = factory(App\User::class)->create();
    return [
        'user_id' => function () {
            return $user->id;
        },
        'user_book_id' => function () {
            return factory(App\UserBook::class)->create([
                'user_id' => $user->id,
            ])->id;
        },
        'page_num_begin' => $faker->numberBetween($min = 1, $max = $pageEnd),
        'page_num_end' => $pageEnd,
        'line_num' => $faker->numberBetween($min = 1, $max = 100),
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTime($max = 'now'),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
