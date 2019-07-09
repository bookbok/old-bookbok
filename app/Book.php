<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Book extends Model
{
    /**
     * リレーション定義
     */
    public function genre(){
        return $this->belongsTo(Genre::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'user_book');
    }

    public function userBooks(){
        return $this->hasMany(UserBook::class);
    }

    public function scopeWhereNamePartialMatch($query, string $conditional) {
        return $query->where(function ($builder) use ($conditional) {
            $builder
                ->orWhere('name', 'LIKE', $conditional)
                ->orWhere('author', 'LIKE', $conditional);
        });
    }

    public static function findRecentReviews(int $bookId) {
        return DB::table('user_book')
            ->where('user_book.book_id', '=', $bookId)
            ->join('reviews', 'user_book.id', '=', 'reviews.user_book_id')
            ->join('users', 'users.id', '=', 'reviews.user_id')
            ->orderby('reviews.updated_at', 'DESC')
            ->limit(5)
            ->get([
                'reviews.*',
                'users.name',
            ]);
    }
}
