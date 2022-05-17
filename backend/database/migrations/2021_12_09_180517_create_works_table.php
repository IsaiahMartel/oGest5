<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('works', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('composer_id')->unsigned();
            $table->string('workName')->nullable();
            $table->string('workName2')->nullable();
            $table->string('workCatalog')->nullable();
            $table->string('workCompyear')->nullable();
            $table->string('workDuration')->nullable();
            $table->string('workArrangement')->nullable();
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
            $table->integer('violin1')->nullable()->unsigned();
            $table->integer('violin2')->nullable()->unsigned();
            $table->integer('viola')->nullable()->unsigned();
            $table->integer('cello')->nullable()->unsigned();
            $table->integer('bass')->nullable()->unsigned();
            $table->longtext('stringsExp')->nullable();
            $table->integer('percussion')->nullable()->unsigned();
            $table->longtext('percussionExp')->nullable();
            $table->integer('keyboard')->nullable()->unsigned();
            $table->longtext('keyboardExp')->nullable();
            $table->integer('extra')->nullable()->unsigned();
            $table->longtext('extraExp')->nullable();
            $table->integer('vocals')->nullable()->unsigned();
            $table->longtext('vocalsExp')->nullable();
            $table->longtext('workDetails')->nullable();
            $table->longText('workNotes')->nullable();

            $table->timestamps();

            $table->foreign('composer_id')->references('id')->on('composers')->onDelete('cascade');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('works');
    }
}
