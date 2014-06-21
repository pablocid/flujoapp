'use strict';

flujoApp.controller('loginController', function ($scope, Restangular, $http, $window, $location){

	Restangular.all('auth/token').customGET().then(function(data){
		$scope.credentials = {
		email: 'pabloagronomo@gmail.com',
		password: 'cid123',
		token: data
	};
	});
	

	$scope.login = function (credentials){
		$scope.loginWait = true;
		Restangular.all('auth/login').customPOST(credentials)
		.then(function (data){
			$scope.credentials = '';
			$location.path('/home');
			//$scope.things = data;
		});
	}

	//$scope.login($scope.credentials);

	$scope.cleanStorage = function(){
		$window.sessionStorage.token = '';
		$window.localStorage.token = '';
		$cookieStore.remove("laravel_session");
		delete $cookies["laravel_session"];
	}
	
});
