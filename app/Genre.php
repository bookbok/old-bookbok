<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    public const SPOILER_ID_LIST = [1, 18];

    public function books(){
        return $this->hasMany(Book::class);
    }
}
