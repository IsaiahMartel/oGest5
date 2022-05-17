<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerplaylistPlaylistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perplaylist_playlist', function (Blueprint $table) {

                $table->engine = 'InnoDB';
                $table->increments('id');
                $table->integer('playlist_id')->unsigned();
                $table->integer('instrument_id')->unsigned();
                $table->timestamps();

                $table->foreign('playlist_id')->references('id')->on('playlists')->onDelete('cascade');
                $table->foreign('instrument_id')->references('id')->on('instruments')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('perplaylist_playlist');
    }
}
