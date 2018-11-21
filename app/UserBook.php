<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
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
}
