<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\Bok;
use App\Models\User;
use App\Models\UserBook;

/** @var Factory $factory */
$factory->define(Bok::class, function (Faker $faker) {
    $pageEnd = $faker->numberBetween($min = 1, $max = 1000);
    $user = factory(User::class)->create();
    return [
        'user_id' => function () use ($user) {
            return $user->id;
        },
        'user_book_id' => function () use ($user) {
            return factory(UserBook::class)->create([
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
