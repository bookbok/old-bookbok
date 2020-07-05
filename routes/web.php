<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/auth/email/verify', function () {
    return view('layouts/app');
})->name('dummy.auth.email.verify');

Route::get('/auth/password/reset', function () {
    return view('layouts/app');
})->name('dummy.auth.password.reset');

Route::get('/users/{userId}/user_books/{userBookId}', 'Ssr\UserBookShowController')
    ->where(['userId' => '[0-9]+', 'userBookId' => '[0-9]+'])
    ->name('ogp.user_book');
Route::get('/{url?}', function () {
    return view('layouts/app');
})->where('url', '(.*)');

//Auth::routes();
