<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserBook;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\AuthorizationException;

class UserBookPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the user book.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
     * @return mixed
     */
    public function view(User $user, UserBook $userBook)
    {
        //
    }

    /**
     * Determine whether the user can create user books.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user, User $userBookOwner)
    {
        if ($user->id == $userBookOwner->id) {
            return true;
        }
        throw new AuthorizationException('自分以外の本棚に追加することはできません。');
    }

    /**
     * Determine whether the user can update the user book.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
     * @return mixed
     */
    public function update(User $user, UserBook $userBook)
    {
        if ($user->id == $userBook->user_id) {
            return true;
        }
        throw new AuthorizationException('自分以外の本棚を編集することはできません。');
    }

    /**
     * Determine whether the user can delete the user book.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
     * @return mixed
     */
    public function delete(User $user, UserBook $userBook)
    {
        if ($user->id == $userBook->user_id) {
            return true;
        }
        throw new AuthorizationException('自分以外の本を削除することはできません。');
    }

    /**
     * Determine whether the user can restore the user book.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
     * @return mixed
     */
    public function restore(User $user, UserBook $userBook)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the user book.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
     * @return mixed
     */
    public function forceDelete(User $user, UserBook $userBook)
    {
        //
    }
}
