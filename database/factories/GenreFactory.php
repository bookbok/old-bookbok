<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use App\Models\Genre;

/** @var Factory $factory */
$factory->define(Genre::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence($nbWords = 1, $variableNbWords = false),
    ];
});
