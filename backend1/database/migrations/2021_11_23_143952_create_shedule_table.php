<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shedules', function (Blueprint $table) {

            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->string('sheduleTipe');
            $table->integer('room_id')->unsigned()->nullable();
            $table->date('sheduleDate');
            $table->string('shedulehourRange')->nullable();
            $table->longText('sheduleNote')->nullable();
            $table->integer('sheduleOrder');
            $table->timestamps();

            //$table->foreign('tipeshedule_id')->references('id')->on('tipeshedules')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shedules');
    }
}
