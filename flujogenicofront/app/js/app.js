'use strict';

// Declare app level module which depends on filters, and services
var flujoApp = angular.module('flujoApp', [
	'ngRoute',
	'restangular',
	'ngSanitize',
	'ngCookies',
	'ui.bootstrap'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home'		, {templateUrl: 'partials/AppInforme/index.html',   controller: 'homeController'});
	$routeProvider.when('/login'	, {templateUrl: 'partials/AppInforme/login.html',   controller: 'loginController'});
	$routeProvider.when('/logout'	, {templateUrl: 'partials/AppInforme/logout.html',  controller: 'logoutController'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);

flujoApp.run(function($cookies, Restangular, $location){
	Restangular.all('auth/check').customGET().then(function(data){
		if(data=='true'){
			$location.path('/home');
		}else{
			$location.path('/login');
		}
	});
});