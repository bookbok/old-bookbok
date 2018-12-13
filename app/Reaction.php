<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    protected $fillable = [
        'user_id', 'bok_id', 'liked', 'loved',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function bok() {
        return $this->belongsTo(Bok::class);
    }


    /**
     * Query scope
     */

    public function scopeIsLiked($query) {
        return $query->where('liked', true);
    }

    public function scopeIsLoved($query) {
        return $query->where('loved', true);
    }

    public function scopeIsReactioned($query) {
        return $query->where('liked', true)->orWhere('loved', true);
    }
}
