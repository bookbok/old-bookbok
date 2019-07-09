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
        return $this->belongsToMany(User::class, 'user_book');
    }

    public function userBooks(){
        return $this->hasMany(UserBook::class);
    }

    public function scopeWhereNamePartialMatch($query, string $conditional) {
        return $query->where(function ($builder) use ($conditional) {
            $builder
                ->orWhere('name', 'LIKE', $conditional)
                ->orWhere('author', 'LIKE', $conditional);
        });
    }
}
