<?php

header('Access-Control-Allow-Origin: http://flujogenicofront.dev:8081');
//header('Access-Control-Allow-Origin: *');

Route::get('/login', function(){
	return Response::json(array(
			'id' => '1', 
			'userid' => '22',
			'role' => 'admin'
		));
});

Route::get('/', function()
{
	return View::make('hello');
});
Route::get('/ok', function()
{
	return 'OK';
});

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

// Route with basic authentification and custom method
Route::group([ 'before' => 'auth.basicCustom' ], function () {
    // User authenticate with sesssion
    Route::get('authenticate', function(){
        echo 'oki';
    });
});
 
// Logout current user
Route::get('/logout', function(){
    Auth::logout();
});
 
// Check state of current user authentification
Route::get('/guest', function(){
    if( Auth::guest() ){
        throw new \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException('x-Basic');
    }else{
        echo 'ok';
    }
});