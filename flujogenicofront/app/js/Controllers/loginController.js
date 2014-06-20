'use strict';

flujoApp.controller('loginController', function ($scope, Restangular, $http, $window, $cookies){

	$scope.credentials = {
		email: '',
		password: ''
	};

	$scope.login = function (credentials){

	//Restangular.customPOST({},'login',{param:credentials}).get()
	Restangular.one('login').customPOST(credentials)
	.then(function (data, status, headers, config){
		$window.sessionStorage.token = data.token;
		$scope.things = {
			data:data,
			status:status,
			headers:headers,
			config: config,
			sessionStore: $window.sessionStorage
		};
		$cookies.laravel_session = data.laravel_session;
		//$cookies.laravel_session = 'holasd';
	});


	// $http({
	// 	method:'POST',
	// 	url:'http://flujogenicoback.dev:8081/login',
	// 	data: credentials
	// }).success(
	// function (data, status, headers, config){
	// 	$window.sessionStorage.token = data.token;
	// 	$scope.things = {
	// 		data:data,
	// 		status:status,
	// 		headers:headers,
	// 		config: config,
	// 		sessionStore: $window.sessionStorage
	// 	};
	// 	//$cookies.laravel_session = data.laravel_session;
	// 	//$cookies.laravel_session = 'holasd';
	// });
	}

	$scope.iflog =  function (){
		//var ssg = $window.sessionStorage;
		var datasend = {
			"token" : 'B8kbeJxAU7dFvBUrzaEaL57m12nRtPIAnLVJiMfT'
		};
		$scope.windowstorage = $window.sessionStorage;
		$http({
			method:'GET',
			url:'http://flujogenicoback.dev:8081/login',
			data: datasend
		})
		.success(function(data){
			$scope.iflogin = data;
		});
	}
	
});
