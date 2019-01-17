<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ForceHttpsProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if (config('https.force')) {
            $this->app['url']->forceScheme('https');
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

    }
}
