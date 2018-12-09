<?php

use Faker\Generator as Faker;

$factory->define(App\Book::class, function (Faker $faker) {
    return [
        'isbn' => $faker->isbn13,
        'name' => $faker->sentence($nbWords = 4, $variableNbWords = false),
        'description' => $faker->realText($maxNbChars = 255, $indexSize = 2),
        'cover' => 'http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
        'author' => $faker->name,
        'genre_id' => 1,
        'created_at' => $faker->dateTimeBetween($startDate = '-1 month', $endDate = 'now'),
        'updated_at' => $faker->dateTime($max = 'now'),
    ];
});
