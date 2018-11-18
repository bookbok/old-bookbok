<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class BookInfoScraper extends Facade
{
    protected static function getFacadeAccessor() {
      return 'app.bookInfo.scrapeManager';
    }
}
