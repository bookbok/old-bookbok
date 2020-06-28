<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\UserBook;
use App\Models\Book;
use App\Models\User;

/** @var Factory $factory */
$factory->define(UserBook::class, function (Faker $faker) {
    return [
        'book_id' => function () {
            return factory(Book::class)->create()->id;
        },
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'created_at' => now(),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
