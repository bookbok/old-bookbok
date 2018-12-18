<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param   Request $request
     *  リクエスト
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        [$queries, $genres, $offset, $maxResult] = $this->normalizeSearchParameters($request);

        $likeConds = array_map(
            function($like){
                return '%' . addcslashes($like, '_%') . '%';
            },
            $queries
        );

        $builder = Book::orderBy('isbn');

        // もしキーワードが設定されていたら
        // WHERE
        //  (name LIKE '%FOO%' OR author LIKE '%FOO%')
        //  AND (name LIKE '%BAR%' OR author LIKE '%BAR%')
        // というSQLを組み立てる
        if (!empty($queries)) {
            foreach ($likeConds as $cond) {
                $builder->where(function ($builder) use ($cond) {
                    $builder
                        ->orWhere('name', 'LIKE', $cond)
                        ->orWhere('author', 'LIKE', $cond)
                    ;
                });
            }
        }

        if (!empty($genres)) {
            $builder->whereIn('genre_id', $genres);
        }

        if (null !== $offset) {
            $builder->offset($offset);
        }

        $collection = $builder->limit($maxResult)->get();

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

    /**
     * 検索用パラメータの正規化を行う
     * 
     * @param   Request $request
     *  リクエスト
     * 
     * @return  mixed[]
     */
    private function normalizeSearchParameters(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'q'         => 'required|string',
            'genres'    => 'required|array',
            'offset'    => 'required|integer|min:1',
            'maxResult' => 'required|integer|min:1|max:100',
        ]);

        $errors    = $validator->errors();
        $query     = $errors->has('q')         ? ''   : $request->query('q', '');
        $genres    = $errors->has('genres')    ? []   : $request->query('genres', []);
        $offset    = $errors->has('offset')    ? null : $request->query('offset', null);
        $maxResult = $errors->has('maxResult') ? 100  : $request->query('maxResult', 100);

        $queries = array_filter(
            explode(
                ' ',
                trim(
                    preg_replace('/[[:cntrl:\s　]+/u', ' ', $query)
                )
            ),
            'mb_strlen'
        );

        $genres = array_map(
            'intval',
            array_filter($genres, function ($v) {
                return is_numeric($v);
            })
        );

        return [$queries, $genres, $offset, $maxResult];
    }
}