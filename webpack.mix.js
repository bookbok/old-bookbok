let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.ts', 'public/js').sass('resources/sass/app.scss', 'public/css');

//mix.babelConfig({
//    "plugins": [
//    ]
//});

if (mix.inProduction()) {
    mix.version(); // production環境でのみバージョニングする
} else {
    mix.sourceMaps(); // 開発環境でのみデバッグ用ソースマップを展開する
}
