<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $collection = Book::orderBy('isbn')->get();

        return response()->json(
            $collection,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        $book->setVisible([
            'id',
            'isbn',
            'name',
            'description',
            'cover',
            'author',
            'genre_id',
        ]);

        return response()->json(
            $book,
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}