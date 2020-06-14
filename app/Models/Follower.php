<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $fillable = [
        'user_id', 'target_id',
    ];

    public function scopeWhereFromForeignKeys($query, $userId, $targetId) {
        return $query->where('user_id', $userId)->where('target_id', $targetId);
    }
}
