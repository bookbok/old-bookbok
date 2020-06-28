<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>
    </head>
    <body>
        <div id="example"></div>
        <script src="{{ asset('js/app.ts') }}"></script>
    </body>
</html>
