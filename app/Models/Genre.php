<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    public const SPOILER_ID_LIST = [1, 18];
    public const ELSE_ID = 15;

    public function books(){
        return $this->hasMany(Book::class);
    }
}
