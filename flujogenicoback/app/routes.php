<?php
//$http_origin = $_SERVER['HTTP_ORIGIN'];

// if ($http_origin == "http://app.flujogenico.cl" || $http_origin == "http://www.app.flujogenico.cl" )
// {  
//     header("Access-Control-Allow-Origin: $http_origin");
// }

//header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: http://flujogenicofront.dev:8081');


header('Access-Control-Allow-Credentials: true');

Route::post('/auth/login','AuthentificationController@postLogin');

Route::get('/auth/check','AuthentificationController@getCheck');

Route::get('/auth/logout','AuthentificationController@getLogout');

Route::get('/auth/token','AuthentificationController@getToken');

Route::get('query/{id}/{type}', 'QuerysController@getRelacionadas');

Route::resource('cultivadas', 'CultivadasController');

Route::resource('introducidas', 'IntroducidasController');

Route::resource('transgenicas', 'TransgenicasController');

Route::get('/', function()
{
	return View::make('hello');
});

Route::get('hash',function(){
	return Hash::make('flujo123');
});
