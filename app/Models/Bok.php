<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bok extends Model
{
    protected $fillable = [
        'user_id', 'user_book_id', 'body', 'published_at', 'page_num_begin', 'page_num_end', 'line_num',
    ];

    protected $casts = [
        'liked_count' => 'integer',
        'loved_count' => 'integer',
        'liked' => 'boolean',
        'loved' => 'boolean',
    ];

    protected $withCount = [
        'likeReactions as liked_count',
        'loveReactions as loved_count',
        'likedReaction as liked',
        'lovedReaction as loved',
    ];


    // withCount用リレーション定義
    public function likeReactions() {
        return $this->hasMany(Reaction::class)->isLiked();
    }

    public function loveReactions() {
        return $this->hasMany(Reaction::class)->isLoved();
    }

    public function likedReaction() {
        return $this->hasMany(Reaction::class)->whereMy()->isLiked();
    }

    public function lovedReaction() {
        return $this->hasMany(Reaction::class)->whereMy()->isLoved();
    }

    // リレーション定義
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function userBook(){
        return $this->belongsTo(UserBook::class, 'user_book_id');
    }

    public function reactions(){
        return $this->hasMany(Reaction::class);
    }
}
