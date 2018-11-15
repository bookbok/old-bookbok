<?php

use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
    $pageBegin = $faker->integer();
    return [
        'page_num_begin' => $pageBegin,
        'page_num_end' => $faker,
        'line_num' => $faker,
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTime($max = 'now'),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
