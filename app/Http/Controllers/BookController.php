<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        [$queries, $genres] = $this->normalizeSearchParameters($request);

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
                $builder->whereNamePartialMatch($cond);
            }
        }

        if (!empty($genres)) {
            $builder->whereIn('genre_id', $genres);
        }

        $books = $builder->paginate(24)
                         ->appends($request->only(['q', 'genres']));

        return response()->json($books);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Book  $book
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        $recentReviews = Book::findRecentReviews($book->id);

        return response()->json(array_merge(
            $book->toArray(),
            ["reviews" => $recentReviews]
        ));
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
        ]);

        $errors    = $validator->errors();
        $query     = $errors->has('q')         ? ''   : $request->query('q', '');
        $genres    = $errors->has('genres')    ? []   : $request->query('genres', []);

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

        return [$queries, $genres];
    }
}
