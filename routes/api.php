<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * Authentication Routes
 */
Route::post('/login','AuthenticationController@login')->name('login');
Route::middleware('auth:api')->group(function () {
    Route::get('/logout','AuthenticationController@logout')->name('logout');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// test method
Route::get('/users', function (Request $request) {
    $users = App\User::all();
    return $users;
});

/**
 *  Resource: BOOK
 *
 */
Route::get('books', 'BookController@index');
Route::get('books/{book}', 'BookController@show');

/**
 *  Resource: UserBook
 *
 */
Route::get('users/{userId}/user_books','BookUserController@index');
Route::get('users/{userId}/user_books/{bookUserId}', 'BookUserController@show');

/**
 * Resource: Genre
 *
 */
Route::get('genres','GenreController@index');
Route::get('genres/{genre}', 'GenreController@show');

/**
 * Resource: Like
 *
 */
Route::get('users/{userId}/likes','LikeController@index');

