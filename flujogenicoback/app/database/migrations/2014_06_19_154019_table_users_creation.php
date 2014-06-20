<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableUsersCreation extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('users',function($table){
			$table->increments('id');
			$table->string('first_name',50);
			$table->string('last_name',50);
			$table->string('profesion',255);
			$table->string('email')->unique();
			$table->string('password');
			$table->string('remember_token')->nullable();
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
		Schema::drop('users');
	}

}

//$2y$10$jl0mC64aGJQJYeXorzbNIO.JudKkPOjkPZ2w685jb.TKwGAuVZVii