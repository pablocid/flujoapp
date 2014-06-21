'use strict';

flujoApp.controller('logoutController', function ($scope, Restangular, $http, $window, $cookies, $cookieStore, $location, $timeout){

	Restangular.all('logout').customGET()
	.then(function (data){

	//$scope.cleanStorage();
	$timeout(function() {
	 	$location.path('/login');
	 }, 500);

	});

	//$scope.login($scope.credentials);

	// $scope.cleanStorage = function(){
	// 	$window.sessionStorage.token = '';
	// 	$window.localStorage.token = '';
	// 	$cookieStore.remove("laravel_session");
	// 	delete $cookies["laravel_session"];
	// }

	
	
});
