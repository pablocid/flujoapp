<?php

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