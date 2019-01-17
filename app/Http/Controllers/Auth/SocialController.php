<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SocialController extends Controller
{
    private const PROVIDER_LIST = [
        'google',
    ];

    /**
     * リダイレクト処理
     * 
     * @param   string  $provider
     *  プロバイダ名
     * 
     * @return  \Illuminate\Http\Response
     */
    public function redirect(string $provider){
        if(!in_array($provider, self::PROVIDER_LIST)){
            return $this->generateUnsuportProviderResponse($provider);
        }
    
        return response()->json([
            'provider' => $provider,
            'uri'      => \Socialite::driver($provider)->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    /**
     * Oauthコールバック処理
     * 
     * 認可プロバイダから受け取ったパラメータを解釈して、認証トークンを発行する。
     *
     * @param   string  $provider
     *  プロバイダ名
     *
     * @return  \Illuminate\Http\Response
     */
    public function callback(string $provider){
        if(!in_array($provider, self::PROVIDER_LIST)){
            return $this->generateUnsuportProviderResponse($provider);
        }

        // MEMO: メールアドレスの別人による再利用の可能性
        $isFirstTime  = false;
        $providerUser = \Socialite::driver($provider)->stateless()->user();
        $user         = User::query()->firstOrNew(['email' => $providerUser->getEmail()]);

        if (!$user->exists) {
            do{
                $name = str_random(15);
            }while(null !== User::where('name', $name)->first());

            $user->name  = $name;
            $isFirstTime = true;

            $user->save(); 
        }

        return response()->json([
            'provider'    => $provider,
            'token'       => $user->createToken(LoginController::TOKEN_NAME)->accessToken,
            'isFirstTime' => $isFirstTime,
        ], 200);
    }

    /**
     * サポートしていないプロバイダを受け取った場合のレスポンスを生成する
     * 
     * @param   string  $provider
     *  プロバイダ名
     * 
     * @return  \Illuminate\Http\Response
     */
    protected function generateUnsuportProviderResponse(string $provider){
        return response()->json([
            'status'      => 400,
            'userMessage' => sprintf('認可プロバイダとして%sは使用できません。', $provider),
        ], 400);
    }
}
