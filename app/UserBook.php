<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserBook extends Model
{
    protected $table = 'user_book';

    public const READING_STATUS = [
        'none' => 0,     // 未設定
        'wanted' => 5,   // 欲しい
        'unread' => 10,  // 積読
        'reading' => 15, // 読書中
        'readed' => 20,  // 読書了
    ];

    /**
     * リレーション定義
     */
    public function review(){
        return $this->hasOne(Review::class, 'user_book_id')
                    ->withDefault([
                        "body" => "未記入"
                    ]);
    }

    public function boks(){
        return $this->hasMany(Bok::class, 'user_book_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function book(){
        return $this->belongsTo(Book::class);
    }


    /**
     * Query scope
     */

    public function scopeNoneStatus($query){
        return $query->where('reading_status', self::READING_STATUS['none']);
    }

    public function scopeWantedStatus($query){
        return $query->where('reading_status', self::READING_STATUS['wanted']);
    }

    public function scopeUnreadStatus($query){
        return $query->where('reading_status', self::READING_STATUS['unread']);
    }

    public function scopeReadingStatus($query){
        return $query->where('reading_status', self::READING_STATUS['reading']);
    }

    public function scopeReadedStatus($query){
        return $query->where('reading_status', self::READING_STATUS['readed']);
    }
}
