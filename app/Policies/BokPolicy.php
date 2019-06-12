<?php

namespace App\Policies;

use App\User;
use App\Bok;
use App\UserBook;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\AuthorizationException;

class BokPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the bok.
     *
     * @param  \App\User  $user
     * @param  \App\Bok  $bok
     * @return mixed
     */
    public function view(User $user, Bok $bok)
    {
        //
    }

    /**
     * Determine whether the user can create boks.
     *
     * @param  \App\User  $user
     * @param  \App\UserBook  $userBook
     * @return mixed
     */
    public function create(User $user, UserBook $userBook)
    {
        if ($user->id == $userBook->user_id) {
            return true;
        }
        throw new AuthorizationException('自分以外の本棚に追加することはできません。');
    }

    /**
     * Determine whether the user can update the bok.
     *
     * @param  \App\User  $user
     * @param  \App\Bok  $bok
     * @return mixed
     */
    public function update(User $user, Bok $bok)
    {
        //
    }

    /**
     * Determine whether the user can delete the bok.
     *
     * @param  \App\User  $user
     * @param  \App\Bok  $bok
     * @return mixed
     */
    public function delete(User $user, Bok $bok)
    {
        if ($user->id == $bok->user_id) {
            return true;
        }
        throw new AuthorizationException('自分以外のBokを削除することはできません。');
    }

    /**
     * Determine whether the user can restore the bok.
     *
     * @param  \App\User  $user
     * @param  \App\Bok  $bok
     * @return mixed
     */
    public function restore(User $user, Bok $bok)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the bok.
     *
     * @param  \App\User  $user
     * @param  \App\Bok  $bok
     * @return mixed
     */
    public function forceDelete(User $user, Bok $bok)
    {
        //
    }
}
