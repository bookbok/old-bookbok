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

    Route::post('password/reset/send', 'ResetPasswordController@send')->name('password.reset.send');
    Route::post('password/reset', 'ResetPasswordController@reset')->name('password.reset');

    Route::middleware('auth:api')->group(function () {
        Route::get('email/verify/{id}', 'VerificationController@verify')
            ->name('email.verify')
            ->where('id', '[1-9][0-9]*')
        ;
        Route::get('email/resend', 'VerificationController@resend')->name('email.verify.resend');

        Route::get('logout','LoginController@logout')->name('logout');

        Route::get('user', 'UserController@show')->name('user');
        Route::put('user', 'UserController@update')->name('user.update');
    });
});

/**
 *  Resource: User
 */
Route::get('/users', 'UserController@index');
Route::get('/users/{userId}', 'UserController@show');

/**
 *  Resource: BOOK
 *
 */
Route::get('books', 'BookController@index');
Route::get('books/{book}', 'BookController@show');

/**
 * Resource: Genre
 *
 */
Route::get('genres','GenreController@index');
Route::get('genres/{genre}', 'GenreController@show');

/**
 * Resource: BokFlow
 */
Route::get('bok_flow', 'BokFlowController@index')->middleware('auth:api');

/**
 *  Resource: UserBook
 *
 */
Route::get('users/{userId}/user_books','UserBookController@index');
Route::get('users/{userId}/user_books/{userBookId}', 'UserBookController@show');
Route::post('users/{userId}/user_books', 'UserBookController@store')->middleware('auth:api');
Route::put('users/{userId}/user_books/{userBookId}', 'UserBookController@update')->middleware('auth:api');

/**
 * Resource: Review
 *
 */
Route::post('user_books/{userBook}/review', 'ReviewController@store')->middleware('auth:api');
Route::put('user_books/{userBook}/review', 'ReviewController@store')->middleware('auth:api');

/**
 * Resource: Bok
 *
 */
Route::get('user_books/{userBookId}/boks', 'BokController@index');
Route::post('user_books/{userBook}/boks', 'BokController@store')->middleware('auth:api');

/**
 * Resource: Reaction
 *
 */
Route::get('users/{userId}/likes','ReactionController@userLikes');
Route::get('users/{userId}/loves','ReactionController@userLoves');

Route::post('boks/{bokId}/likes', 'ReactionController@storeLike')->middleware('auth:api');
Route::delete('boks/{bokId}/likes', 'ReactionController@deleteLike')->middleware('auth:api');
Route::post('boks/{bokId}/loves', 'ReactionController@storeLove')->middleware('auth:api');
Route::delete('boks/{bokId}/loves', 'ReactionController@deleteLove')->middleware('auth:api');

/**
 * Resource: Follower
 *
 */
Route::get('users/{user}/followers','FollowerController@followers');
Route::get('users/{user}/followings','FollowerController@followings');
Route::post('users/{userId}/followings','FollowerController@follow')->middleware('auth:api');
Route::delete('users/{userId}/followings/{targetId}','FollowerController@unfollow')->middleware('auth:api');
