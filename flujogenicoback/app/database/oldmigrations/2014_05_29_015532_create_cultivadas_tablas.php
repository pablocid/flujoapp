<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCultivadasTablas extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('cultivadas',function($table){
			$table->increments('id');
			$table->string('taxa');
			$table->integer('Cen');
			$table->integer('Cnati');
			$table->integer('Cin');
			$table->integer('Cnatu');
			$table->integer('Cag');
			$table->integer('Cor');
			$table->integer('Cfo');
			$table->integer('Cma');
			$table->integer('Cse');
			$table->integer('Cve');
			$table->integer('Can');
			$table->integer('Cbi');
			$table->integer('Cpe');
			$table->integer('Cbu');
			$table->integer('Cang');
			$table->integer('Calg');
			$table->integer('Cent');
			$table->integer('Cane');
			$table->integer('Cart');
			$table->integer('Clan');
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
		Schema::drop('cultivadas');
	}

}
