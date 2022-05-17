<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLibrariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('libraries', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('work_id')->unsigned();
            $table->integer('address_id')->unsigned()->nullable();
            $table->boolean('libraryParts')->unsigned();
            $table->string('libraryStrings')->nullable();
            $table->string('libraryInstrumentation')->nullable();
            $table->string('libraryCatalog')->nullable();
            $table->boolean('libraryWwdouble')->unsigned();
            $table->boolean('librarystringMasters')->unsigned();
            $table->boolean('libraryPermanent')->unsigned();
            $table->string('libraryMaterial')->nullable();
            $table->text('libraryNote')->nullable();
            $table->boolean('libraryCompra')->nullable();
            $table->boolean('libraryAlquiler')->nullable();
            $table->string('libraryUrl')->nullable();
            $table->timestamps();

            $table->foreign('work_id')->references('id')->on('works')->onDelete('cascade');
            $table->foreign('address_id')->references('id')->on('addresses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('libraries');
    }
}
