<?php

namespace App\Http\Controllers\Ssr;

use App\Models\UserBook;
use App\Http\Controllers\Controller;

class UserBookShowController extends Controller
{
    /**
     * UserBookの詳細ページへリンクされた時のOGPを設定するためのハック
     *
     * @param  userId: ユーザの主キー
     * @param  userBookId: ユーザブックの主キー
     * @return \Illuminate\Http\Response
     */
    public function __invoke(int $userId, int $userBookId)
    {
        $userBook = UserBook::query()
            ->with([
                'book:id,name,cover,description',
                'user:id,name',
            ])
            ->find($userBookId);

        $ogpTitle = $userBook->book->name . ':' . $userBook->user->name . 'さんの感想';
        $ogpDescription = $ogpTitle . '、Boksページです。' . $userBook->book->description;
        return view('layouts/app', [
            'ogp_image' => $userBook->book->cover,
            'ogp_title' => $ogpTitle,
            'ogp_description' => $ogpDescription,
        ]);
    }
}
