<?php

class AuthentificationController extends BaseController {

public function postLogin(){

	$credentials = array(
		'email'=>Input::get('email'),
		'password'=>Input::get('password'),
	);

	if(Session::token() == Input::get('token')){ $tokenMatch = true; }

	else{ $tokenMatch = false; }

	//Auth::attempt valida las credenciales
	if( Auth::attempt($credentials) && $tokenMatch ){

		if( Auth::check() ){ 
			return Response::json(['log' => 'true'], 200 );
		}else{
			return Response::json([	'log' => 'false','flash' => 'Check failed' ], 401 );
		}

	}else{
		return Response::json([ 'log' => 'false','flash' => 'Authentication failed'], 401 );
	}

}

public function getLogout(){

	Auth::logout();
	return 'Logout';
}

public function getCheck(){

	if(Auth::check()){
		return 'true';
	}else{
		return 'false';
	}
}

public function getToken(){

	return csrf_token();
}

}
