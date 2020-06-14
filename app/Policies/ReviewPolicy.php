<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Review;
use App\Models\UserBook;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\AuthorizationException;

class ReviewPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Review  $review
     * @return mixed
     */
    public function view(User $user, Review $review)
    {
        //
    }

    /**
     * Determine whether the user can create reviews.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\UserBook  $userBook
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
     * Determine whether the user can update the review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Review  $review
     * @return mixed
     */
    public function update(User $user, Review $review)
    {
        //
    }

    /**
     * Determine whether the user can delete the review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Review  $review
     * @return mixed
     */
    public function delete(User $user, Review $review)
    {
        //
    }

    /**
     * Determine whether the user can restore the review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Review  $review
     * @return mixed
     */
    public function restore(User $user, Review $review)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the review.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Review  $review
     * @return mixed
     */
    public function forceDelete(User $user, Review $review)
    {
        //
    }
}
