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
        return $this->belongsTo(BookUser::class);
    }

}
