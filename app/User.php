<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
        return $this->belongsToMany(Book::class, 'book_user', 'user_id', 'book_id')
                    ->withPivot('id')
                    ->withTimestamps();
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function boks(){
        return $this->hasMany(Bok::class);
    }

    public function likes(){
        return \App\Reaction::where('user_id', $this->id)->where('liked', 1)
            ->with([
                'user:id,name,avatar,description',
                'bok:id,user_id,body,page_num_begin,page_num_end,published_at,book_user_id',
                'bok.bookUser:id,book_id',
                'bok.bookUser.book:isbn,name,cover',
            ])->get();
    }
}
