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