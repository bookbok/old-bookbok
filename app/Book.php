<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    // 自動増分の抑制
    public $incrementing = false;
    // 'id'ではない主キーの設定
    protected $primaryKey = 'isbn';

    /**
     * リレーション定義
     */
    public function genre(){
        return $this->belongsTo(Genre::class);
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function userBooks(){
        return $this->hasMany(BookUser::class, 'book_id', 'isbn');
    }
}
