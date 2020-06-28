<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\Review;
use App\Models\User;
use App\Models\UserBook;

/** @var Factory $factory */
$factory->define(Review::class, function (Faker $faker) {
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
        'body' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'published_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
    ];
});
