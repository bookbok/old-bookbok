<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    /**
     *リレーション定義
     */
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function bookUser(){
        return $this->belongsTo(BookUser::class);
    }
}
