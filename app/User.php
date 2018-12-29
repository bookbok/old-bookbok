<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
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
        'password', 'remember_token', 'email', 'email_verified_at',
    ];

    protected $casts = [
        'follower_count' => 'integer',
        'following_count' => 'integer',
        'is_follower' => 'boolean',
        'is_following' => 'boolean',
    ];

    /**
     * リレーション定義
     */
    public function books(){
        return $this->belongsToMany(Book::class, 'user_book')
                    ->withPivot('id', 'reading_status', 'is_spoiler')
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

    public function followers(){
        return $this->belongsToMany(User::class, 'followers', 'target_id', 'user_id')
                    ->withPivot('id')
                    ->withTimestamps();
    }

    public function followings(){
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'target_id')
                    ->withPivot('id')
                    ->withTimestamps();
    }

    public function likes(){
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
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
                'reactions as liked' => function($q2) use($authId) {
                    $q2->isLiked()->where('user_id', $authId);
                },
                'reactions as loved' => function($q2) use($authId) {
                    $q2->isLoved()->where('user_id', $authId);
                },
            ])->whereHas('reactions', function($q) {
                $q->isLiked(); // likeされているものをフィルタリング
            })->get();
    }

    public function loves(){
        $authId = auth()->guard('api')->id();
        if($authId === null) {
            $authId = 0;
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
                'reactions as liked' => function($q2) use($authId) {
                    $q2->isLiked()->where('user_id', $authId);
                },
                'reactions as loved' => function($q2) use($authId) {
                    $q2->isLoved()->where('user_id', $authId);
                },
            ])->whereHas('reactions', function($q) {
                $q->isLoved(); // loveされているものをフィルタリング
            })->get();
    }

    /**
     * {@inheritdoc}
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new Notifications\VerifyEmail);
    }

    /**
     * {@inheritdoc}
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new Notifications\ResetPassword($token));
    }


    /**
     * フォロー系の情報を含めたユーザーテーブルのクエリを返す
     * @params $authId
     *   ログインユーザーのID
     */
    public static function withFollowInfo($authId) {
        return self::leftJoin('followers', 'users.id', '=', 'followers.user_id')
            ->select('users.id', 'users.name', 'users.avatar', 'users.description', 'users.created_at', 'users.updated_at', 'users.role_id')
            ->selectRaw('(select count(*) from followers where target_id = users.id) as follower_count')
            ->selectRaw('(select count(*) from followers where user_id = users.id) as following_count')
            // ログインユーザーがフォローされているか？
            ->selectRaw('(select count(*) from followers where user_id = users.id and target_id = ?) as is_follower', [$authId])
            // ログインユーザーがフォローしているか？
            ->selectRaw('(select count(*) from followers where user_id = ? and target_id = users.id) as is_following', [$authId]);
    }
}
