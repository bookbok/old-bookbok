<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bok extends Model
{
    // リレーション定義
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function userBook(){
        return $this->belongsTo(UserBook::class, 'user_book_id');
    }

    public function reactions(){
        return $this->hasMany(Reaction::class);
    }
}
