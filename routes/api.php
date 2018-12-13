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
Route::prefix('auth')->namespace('Auth')->name('auth.')->group(function(){
    Route::post('login','LoginController@login')->name('login');
    Route::post('register','RegisterController@register')->name('register');

    Route::middleware('auth:api')->group(function () {
        Route::get('email/verify/{id}', 'VerificationController@verify')
            ->name('email.verify')
            ->where('id', '[1-9][0-9]*')
        ;
        Route::get('email/resend', 'VerificationController@resend')->name('email.verify.resend');

        Route::get('logout','LoginController@logout')->name('logout');
        Route::get('user', function (Request $request) {
            return $request->user();
        })->name('user');
    });
});

Route::post('/login','Auth\\LoginController@login');
Route::middleware('auth:api')->group(function () {
    Route::get('/logout','Auth\\LoginController@logout');
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
 * Resource: Bok
 * 
 */
Route::get('user_books/{userBookId}/boks', 'BokController@index');

/**
 *  Resource: UserBook
 *
 */
Route::get('users/{userId}/user_books','UserBookController@index');
Route::get('users/{userId}/user_books/{userBookId}', 'UserBookController@show');
Route::post('users/{userId}/user_books', 'UserBookController@store');

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
Route::get('users/{userId}/likes','ReactionController@likes');

