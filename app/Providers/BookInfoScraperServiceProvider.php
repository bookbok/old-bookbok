<?php

namespace App\Providers;

use App\Components\BookInfoScraper\ScrapeManager;
use App\Components\BookInfoScraper\GoogleBooksScraper;
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
        // GoogleBooksScraperをコンテナに登録
        $this->app->bind(
            'GoogleBooksScraper',
            function(){
                return new GoogleBooksScraper();
            }
        );

        // tag付け
        $this->app->tag(['GoogleBooksScraper'], 'app.bookInfo.scraper');

        // ScrapeManagerをコンテナに登録
        // コンストラクタに引数として'app.bookInfo.scraper'のタグを持つ各スクレイパーを渡す
        $this->app->bind(
            'app.bookInfo.scrapeManager',
            function ($app) {
                return new ScrapeManager($app->tagged('app.bookInfo.scraper'));
            }
        );
    }
}
