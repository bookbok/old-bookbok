<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
{
    protected $table = 'user_book';

    /**
     * リレーション定義
     */
    public function review(){
        return $this->hasOne(Review::class, 'user_book_id');
    }

    public function boks(){
        return $this->hasMany(Bok::class, 'user_book_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function book() {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
