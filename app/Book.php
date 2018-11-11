<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{

    /**
     * リレーション定義
     */
    public function genre(){
        return $this->belongsTo(Genre::class);
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }
}
