<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Display listing of resources.
     *
     *
     */
    public function index(){

        $genres = Genre::orderBy('id')
                  ->get(['id', 'name']);

        return response()->json($genres);
    }


    /**
     * Display the specified resources.
     *
     *
     */
    public function show(Genre $genre){

        $genre->setVisible([
            'id',
            'name',
        ]);

        return response()->json($genre);
    }
}
