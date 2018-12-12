<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * リレーション定義
     */
    public function books(){
        return $this->belongsToMany(Book::class, 'user_book')
                    ->withPivot('id')
                    ->withTimestamps();
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function boks(){
        return $this->hasMany(Bok::class);
    }

    public function reactions(){
        return $this->hasMany(Reaction::class);
    }

    public function likes(){
        $userId = Auth::id();
        if($userId === null) {
            $userId = 0;
        }

        return $this->boks()
            ->with([
                'userBook:id,user_id,book_id',
                'userBook.book:id,name,cover',
                'userBook.user:id,name,avatar',
            ])->withCount([
                'reactions as liked_count' => function($q2) {
                    $q2->isLiked();
                },
                'reactions as loved_count' => function($q2) {
                    $q2->isLoved();
                },
                'reactions as liked' => function($q2) use($userId) {
                    $q2->isLiked()->where('user_id', $userId);
                },
                'reactions as loved' => function($q2) use($userId) {
                    $q2->isLoved()->where('user_id', $userId);
                },
            ])->get();
    }
}
