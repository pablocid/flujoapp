'use strict';

// Declare app level module which depends on filters, and services
var flujoApp = angular.module('flujoApp', [
	'ngRoute',
	// 'ngResource',
	'restangular',
	'ngSanitize',
	'ngCookies'
	//'mgcrea.ngStrap'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home'		 , {templateUrl: 'partials/AppInforme/index.html',   controller: 'homeController'});
	$routeProvider.when('/login'	, {templateUrl: 'partials/AppInforme/login.html',   controller: 'loginController'});
	$routeProvider.otherwise({redirectTo: '/home'});
	//RestangularProvider.setDefaultRequestParams({ _token: $window.sessionStorage.token});

	//$http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'

	//RestangularProvider.setDefaultRequestParams({ token: $window.sessionStorage.token });
	//RestangularProvider.setDefaultHeaders({'Authorization': 'Basic' + $window.sessionStorage.token});
	// RestangularProvider.setDefaultHeaders(
	// 	{"Content-Type": "application/json;charset=utf-8"},
	// 	{"Authorization": "Basic " + $window.sessionStorage.token}
	// );
}]);

// flujoApp.config(function($http){

// 	$http.defaults.headers.common.Authorization = 'Basic '+ $window.sessionStorage.token;

// });

// flujoApp.run(function($http){
//     //$http.defaults.headers.common['csrf_token'] = $window.sessionStorage.token;

// });

// flujoApp.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
//   return {
//     request: function (config) {
//       config.headers = config.headers || {};
//       if ($window.sessionStorage.token) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//       }
//       return config;
//     },
//     response: function (response) {
//       if (response.status === 401 || response.status === 405) {
//         // handle the case where the user is not authenticated
//         $location.path('/login');
//       }
//       return response || $q.when(response);
//     }
//   };
// });

// flujoApp.config(function ($httpProvider) {
//   $httpProvider.interceptors.push('authInterceptor');
// });