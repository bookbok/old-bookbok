<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\JsonResponse;

class UnescapeJsonResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if(! $response instanceof JsonResponse) {
            return $response;
        }

        // JsonResponseのみ、既存のencodingオプションにJSON_UNESCAPED_UNICODEを追加する
        $newEncodeOptions = $response->getEncodingOptions() | JSON_UNESCAPED_UNICODE;
        $response->setEncodingOptions($newEncodeOptions);

        return $response;
    }
}
