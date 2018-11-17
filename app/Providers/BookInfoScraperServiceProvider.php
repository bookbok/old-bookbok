<?php

namespace App\Providers;

use App\Components\BookInfoScraper\ScrapeManager;
use Illuminate\Support\ServiceProvider;

class BookInfoScraperServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'app.bookinfo.scrapeManager',
            function ($app) {
                return new ScrapeManager($app->tagged('app.bookinfo.scraper'));
            }
        );
    }
}
