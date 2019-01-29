<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterImageUrlColumnMaxLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar', 1000)->default('')->change();
        });

        Schema::table('books', function (Blueprint $table) {
            $table->string('cover', 1000)->change();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection()->getPdo()->exec(
            'UPDATE users SET avatar = "" WHERE 255 < LENGTH(avatar)'
        );

        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->default('')->change();
        });

        DB::connection()->getPdo()->exec(
            'UPDATE books SET cover = "https://placehold.jp/cccccc/ffffff/200x284.png?text=not%20found" WHERE 255 < LENGTH(cover)'
        );

        Schema::table('books', function (Blueprint $table) {
            $table->string('cover')->change();
        });
    }
}
