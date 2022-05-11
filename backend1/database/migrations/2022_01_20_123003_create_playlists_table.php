<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlaylistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('playlists', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('work_id')->nullable()->unsigned();
            $table->integer('composer_id')->nullable()->unsigned();
            $table->integer('project_id')->unsigned();
            $table->integer('playlistOrder')->unsigned();
            $table->string('workName')->nullable();
            $table->string('workDuration')->nullable();
            $table->integer('flute')->nullable()->unsigned();
            $table->string('fluteExp')->nullable();
            $table->integer('oboe')->nullable()->unsigned();
            $table->string('oboeExp')->nullable();
            $table->integer('clarinet')->nullable()->unsigned();
            $table->string('clarinetExp')->nullable();
            $table->integer('bassoon')->nullable()->unsigned();
            $table->string('bassoonExp')->nullable();
            $table->integer('horn')->nullable()->unsigned();
            $table->string('hornExp')->nullable();
            $table->integer('trumpet')->nullable()->unsigned();
            $table->string('trumpetExp')->nullable();
            $table->integer('trombone')->nullable()->unsigned();
            $table->string('tromboneExp')->nullable();
            $table->integer('tuba')->nullable()->unsigned();
            $table->string('tubaExp')->nullable();
            $table->integer('timpani')->nullable()->unsigned();
            $table->string('timpaniExp')->nullable();
            $table->integer('harp')->nullable()->unsigned();
            $table->string('harpExp')->nullable();
            //$table->integer('violin1')->nullable()->unsigned();
            //$table->integer('violin2')->nullable()->unsigned();
            //$table->integer('viola')->nullable()->unsigned();
            //$table->integer('cello')->nullable()->unsigned();
            //$table->integer('bass')->nullable()->unsigned();
            //$table->longtext('stringsExp')->nullable();
            $table->integer('percussion')->nullable()->unsigned();
            $table->longtext('percussionExp')->nullable();
            $table->integer('keyboard')->nullable()->unsigned();
            $table->longtext('keyboardExp')->nullable();
            $table->integer('extra')->nullable()->unsigned();
            $table->longtext('extraExp')->nullable();
            $table->integer('vocals')->nullable()->unsigned();
            $table->longtext('vocalsExp')->nullable();
            $table->longtext('playlistString')->nullable();
            $table->longText('playlistTecnical')->nullable();

            $table->timestamps();

            $table->foreign('work_id')->references('id')->on('works');
            $table->foreign('composer_id')->references('id')->on('composers');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('playlists');
    }
}
