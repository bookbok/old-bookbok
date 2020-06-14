<?php

namespace App\Models;

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

    public function scopeWhereMy($query) {
        $authId = getAuthIdOrZero();
        return $query->where('user_id', $authId);
    }

    public function scopeWhereFromForeignKeys($query, $userId, $bokId) {
        return $query->where('bok_id', $bokId)->where('user_id', $userId);
    }
}
