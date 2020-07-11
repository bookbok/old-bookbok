<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:site_name" content="{{ config('app.name', 'BookBok') }}">
    @if (isset($ogp_title))
        <meta property="og:title" content="{{ $ogp_title }}">
    @else
        <meta property="og:title" content="{{ config('app.name', 'BookBok') }}">
    @endif

    @if (isset($ogp_description))
        <meta property="og:description" content="{{ $ogp_description }}">
    @else
        <meta property="og:description" content="読書を今よりも素敵に。本と感想をまとめて管理できるサービスです。">
    @endif

    @if (isset($ogp_image))
        <meta property="og:image" content="{{ $ogp_image }}">
    @else
        <meta property="og:image" content="">
    @endif

    <meta name="twitter:card" content="summary">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.0/css/all.css" integrity="sha384-aOkxzJ5uQz7WBObEZcHvV5JvRW3TUc2rNPA7pe3AwnsUohiw1Vj2Rgx2KSOkF5+h" crossorigin="anonymous">

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app"></div>

    <!-- React -->
    <script src="{{ mix('js/app.js') }}" defer></script>
</body>
</html>
