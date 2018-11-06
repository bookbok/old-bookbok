<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /**
     * 出力として出したくないフィールドのリスト
     *
     * @var array
     * 
     * @see https://readouble.com/laravel/5.7/ja/eloquent-serialization.html
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
