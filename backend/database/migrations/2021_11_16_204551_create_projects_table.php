<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('event_id')->unsigned();
            $table->integer('season_id')->unsigned();
            $table->string('projectNote')->nullable();
            $table->date('projectDateIni');
            $table->date('projectDateEnd');
            $table->integer('projectLevel')->default(1);
            $table->integer('projectRevision')->default(0);
            $table->integer('projectCambios')->default(0);
            $table->string('projectArtistico')->nullable();  // PROCESO - TERMINADO
            $table->string('projectProduccion')->nullable(); // PROCESO - TERMINADO
            $table->string('projectArchivo')->nullable();    // PROCESO - TERMINADO
            //$table->string('projectPublished')->default('NO');  // SI - NO
            $table->timestamps();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->foreign('season_id')->references('id')->on('seasons')->onDelete('cascade');



        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
