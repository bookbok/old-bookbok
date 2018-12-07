<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookUser extends Model
{
    protected $table = 'book_user';

    /**
     * リレーション定義
     */
    public function review(){
        return $this->hasOne(Review::class);
    }

    public function boks(){
        return $this->hasMany(Bok::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function book() {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
