<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserUpdateRequest;

class UserController extends Controller
{
    /**
     * ユーザ情報
     *
     * @param   Request  $request
     *  リクエスト
     *
     * @return  \App\Models\User
     */
    public function show(Request $request)
    {
        return $request->user()->makeVisible([
            'email',
            'email_verified_at',
        ]);
    }

    /**
     * ユーザー情報更新
     *
     * @param   UserUpdateRequest $request
     *  リクエスト
     *
     * @return  \App\Models\User
     */
    public function update(UserUpdateRequest $request)
    {
        // HACK: ConvertEmptyStringsToNullミドルウェアによって空文字はnullに変換されてしまうためnullを許可
        // descriptionとavatarをDBに保存する直前でnullの場合は空文字に変換する
        $user->name        = $request->name;
        $user->description = $request->description ?? '';
        $user->avatar      = $request->avatar ?? '';

        $user->save();

        return $user->makeVisible([
            'email',
            'email_verified_at',
        ]);
    }
}
