<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Schema;
use DateTime;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        // Force SSL in production
        if($this->app->environment() == 'production') {
            URL::forceScheme('https');

            \Log::listen(function () {
                $monolog = \Log::getLogger();
                $slackHandler = new \Monolog\Handler\SlackHandler(
                    env('SLACK_APP_KEY'),
                    '#sentry',
                    'Monolog',
                    true,
                    null,
                    \Monolog\Logger::ERROR
                );
                $monolog->pushHandler($slackHandler);
            });
        }

        DB::listen(function ($query) {
            $sql = $query->sql;
            foreach($query->bindings as $bind) {
                // DateTime can't convert to string.
                if($bind instanceof DateTime) {
                    $sql = preg_replace("/\?/", $bind->format('Y-m-d H:i:s'), $sql, 1);
                    continue;
                }
                $sql = preg_replace("/\?/", $bind, $sql, 1);
            }
            logger($sql);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
