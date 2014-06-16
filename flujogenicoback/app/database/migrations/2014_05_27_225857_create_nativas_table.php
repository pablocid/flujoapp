<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNativasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('nativas',function($table){
			$table->increments('id');
			$table->string('taxa');
			$table->integer('Nex');
			$table->integer('Np');
			$table->integer('Nv');
			$table->integer('Nr');
			$table->integer('Nen');
			$table->softDeletes();
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
		//
		Schema::drop('nativas');
	}

}
