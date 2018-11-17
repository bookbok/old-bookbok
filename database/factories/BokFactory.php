<?php

use Faker\Generator as Faker;

$factory->define(App\Bok::class, function (Faker $faker) {
    $pageEnd = $faker->numberBetween($min = 1, $max = 1000);
    return [
        'page_num_begin' => $faker->numberBetween($min = 1, $max = $pageEnd),
        'page_num_end' => $pageEnd,
        'line_num' => $faker->numberBetween($min = 1, $max = 100),
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTime($max = 'now'),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
