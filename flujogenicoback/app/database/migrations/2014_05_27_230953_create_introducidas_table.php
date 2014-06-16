<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIntroducidasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('introducidas',function($table){
			$table->increments('id');
			$table->string('taxa');
			$table->integer('Ia');
			$table->integer('Io');
			$table->integer('If');
			$table->integer('Ime');
			$table->integer('Ima');
			$table->integer('In');
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
		Schmema::drop('introducidas');
	}

}
