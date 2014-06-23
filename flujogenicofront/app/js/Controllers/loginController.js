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
			if(data.log){
				$scope.credentials = '';
				$location.path('/home');
			}else{
				$scope.loginWait = false;
			}
			$scope.things = data;
		});
	}

});
