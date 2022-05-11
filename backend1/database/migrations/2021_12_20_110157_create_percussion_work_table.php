<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePercussionWorkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('percussion_work', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('work_id')->unsigned();
            $table->integer('instrument_id')->unsigned();
            $table->timestamps();

            $table->foreign('work_id')->references('id')->on('works')->onDelete('cascade');
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
        Schema::dropIfExists('percussion_work');
    }
}
