<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            //$table->string('address_id')->nullable();
            $table->string('addressCode')->nullable();
            $table->string('addressfirstName')->nullable();
            $table->string('addresslastName');
            $table->string('addressStreet')->nullable();
            $table->string('addressNumber')->nullable();
            $table->string('addressPlace')->nullable();
            $table->string('addresszipCode')->nullable();
            $table->text('addressNotes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
}
