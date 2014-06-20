<?php

header('Access-Control-Allow-Origin: http://flujogenicofront.dev:8081');
//header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Credentials: true');
Route::post('/login', function(){

$credentials = array(
	'email'=>Input::get('email'),
	'password'=>Input::get('password'),
);

//Auth::attempt valida las credenciales
if( Auth::attempt($credentials) ){

	if( Auth::check() ){ 

		//loop para crear un token unico
		// while(true){
		// 	//$token = str_random(15); //TODO: usar una manera mas segura para generar el token
		// 	$token = csrf_token();
		// 	$userToken = User::where('remember_token', '=', $token)->get();

		// 	if($userToken->count() > 0) continue;
		// 	else break;
		// }

		 $token = Session::token();
		// //setear el token para el usuario
		//  $userC = User::find(Auth::user()->id);
		//  $userC->remember_token =  $token
		//  $userC->save();
		//Auth::user()->update(['remember_token'=>$token]);
		 $cookies = Cookie::get('laravel_session');
		 $laravel_session = Crypt::encrypt($cookies);

		return Response::json(
			['user' => Auth::user()->toArray(),
	        'token' => $token,
	        'laravel_session' => $laravel_session 
	        ], 200
	    );

	}else{
		return Response::json(
			['flash' => 'Check failed'], 401
         );
	}
}else{
	return Response::json([
                    'flash' => 'Authentication failed'],
                401
      );
}

	// return Response::json(array(
	// 		'id' => '1', 
	// 		'userid' => '22',
	// 		'role' => 'admin',
	// 		'token' => csrf_token()
	// ));
});

Route::get('/login',function(){
	$token = Input::get('token');
	if(Session::token() == $token){
		return 'El Token es correcto';
	}else{
		return 'Token Incorrecto <br> '.$token .'<br>'. Session::token();
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