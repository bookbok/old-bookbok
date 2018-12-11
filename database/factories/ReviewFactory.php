<?php

use Faker\Generator as Faker;
use Carbon\Carbon;

$factory->define(App\Review::class, function (Faker $faker) {
    return [
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
    ];
});
