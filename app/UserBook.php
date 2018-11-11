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
        return $this->hasOne(Review::class);
    }
}
