<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

// Para habilitar acceso de distintos origenes -- chequear si se puede restringir a determinada ip
App::before(function($request)
{
    if (Request::getMethod() == "OPTIONS") {
        $headers = array(
            'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers'=> 'X-Requested-With, content-type, X-Auth-Token',);
        return Response::make('', 200, $headers);
    }
});

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function($route, $request)
{
	//if (Auth::guest()) //return Redirect::guest('login');
	$payload = $request->header('X-Auth-Token');
	$cookies = Cookie::get('laravel_session');

	if (Session::token() != $payload){
		return Response::json(
			['flash' => 'Authentication failed',
			'Playload' => $payload,
			'SessionToken()' => Session::all(),
			'Cookies' => $cookies
			], 401 );	
	}
	
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});

Route::filter('ngcsrf',function($route,$request) {
     
    $token = md5(Session::token());
    $supplied = $request->header('X-XSRF-TOKEN');
     
    if(empty($supplied) || $token != $supplied) {
        throw new Illuminate\Session\TokenMismatchException;
    }
});
