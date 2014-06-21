<?php

header('Access-Control-Allow-Origin: http://flujogenicofront.dev:8081');
header('Access-Control-Allow-Credentials: true');

Route::post('/auth/login','AuthentificationController@postLogin');

Route::post('getcookies',function(){
	if(Auth::check()){
		return 'true';
	}else{
		return 'false';
	}
});

Route::get('/logout',function(){
	Auth::logout();
	return 'Logout';
});

Route::get('/', function()
{
	return View::make('hello');
});
Route::get('/ok', function()
{
	return 'OK';
});

// Route::get('/hash', function(){
// 	return Hash::make('cid123');
// });
Route::get('query/{id}/{type}', 'QuerysController@getRelacionadas');

// Route::get('cultivadas/trash', 'CultivadasController@getTrash');
// Route::get('cultivadas/{id}/trash', 'CultivadasController@getTrash');
// Route::delete('cultivadas/{id}/trash', 'CultivadasController@deleteTrash');
Route::resource('cultivadas', 'CultivadasController');
Route::resource('transgenicas', 'TransgenicasController');

// Route::get('species/trash', 'SpeciesController@getTrash');
// Route::get('species/{id}/trash', 'SpeciesController@getTrash');
// Route::delete('species/{id}/trash', 'SpeciesController@deleteTrash');
// Route::resource('species', 'SpeciesController');

Route::get('/auth/token', function () {
	return csrf_token();
});