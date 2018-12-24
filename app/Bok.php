<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bok extends Model
{
    protected $fillable = [
        'user_id', 'user_book_id', 'body', 'published_at', 'page_num_begin', 'page_num_end', 'line_num',
    ];

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
