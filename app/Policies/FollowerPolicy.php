<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Follower;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\AuthorizationException;

class FollowerPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the follower.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Follower  $follower
     * @return mixed
     */
    public function view(User $user, Follower $follower)
    {
        //
    }

    /**
     * Determine whether the user can create followers.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user, User $byUser)
    {
        if ($user->id == $byUser->id) {
            return true;
        }
        throw new AuthorizationException('リクエスト権限がありません');
    }

    /**
     * Determine whether the user can update the follower.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Follower  $follower
     * @return mixed
     */
    public function update(User $user, Follower $follower)
    {
        //
    }

    /**
     * Determine whether the user can delete the follower.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Follower  $follower
     * @return mixed
     */
    public function delete(User $user, User $byUser)
    {
        if ($user->id == $byUser->id) {
            return true;
        }
        throw new AuthorizationException('リクエスト権限がありません');
    }

    /**
     * Determine whether the user can restore the follower.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Follower  $follower
     * @return mixed
     */
    public function restore(User $user, Follower $follower)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the follower.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Follower  $follower
     * @return mixed
     */
    public function forceDelete(User $user, Follower $follower)
    {
        //
    }
}
