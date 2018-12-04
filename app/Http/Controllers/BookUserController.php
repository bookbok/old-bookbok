<?php

namespace App\Http\Controllers;

use App\BookUser;
use App\User;
use App\Book;
use Illuminate\Http\Request;

class BookUserController extends Controller
{
    /**
     * 特定ユーザの本棚のなかに登録されている本の一覧情報を返す
     *
     * @param userId : ユーザID
     * @return JSON形式のユーザの本棚内一覧
     */
    public function index($userId)
    {

        $userBooks = User::with(['books' => function($q) {
                        $q->select('books.isbn','books.name', 'books.cover', 'books.author', 'books.genre_id');
                     }])
                     ->select('users.id', 'users.name', 'users.avatar', 'users.description', 'users.role_id')
                     ->find($userId);

        return response()->json(
            $userBooks,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * 本棚に収められた本の詳細情報表示用API.
     *
     * @param  bookUserId: ユーザブックの主キー
     * @return JSON形式のまるっと情報
     */
    public function show($bookUserId)
    {
        $userBook = BookUser::with([
                        'user:id,name,avatar,description',
                        'review:id,user_id,book_user_id,body,published_at',
                        'boks:id,user_id,book_user_id,body,page_num_begin,page_num_end,published_at'
                        ])
                    ->select(['id', 'user_id', 'book_id'])
                    ->find($bookUserId);

        return response()->json(
            $userBook,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function edit(BookUser $userBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BookUser $userBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\BookUser  $userBook
     * @return \Illuminate\Http\Response
     */
    public function destroy(BookUser $userBook)
    {
        //
    }
}
