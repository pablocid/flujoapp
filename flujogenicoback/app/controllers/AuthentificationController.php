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
	if( Auth::attempt($credentials, true) && $tokenMatch ){

		if( Auth::check() ){ 

			return Response::json(
				[
					
				], 200 );
		}else{
			return Response::json(
				[
					'flash' => 'Check failed'
				], 401 );
		}

	}else{
		return Response::json(
			[
				'flash' => 'Authentication failed'
			], 401 );
	}

}

}
