'use strict';

// Declare app level module which depends on filters, and services
var flujoApp = angular.module('flujoApp', [
	'ngRoute',
	// 'ngResource',
	'restangular',
	'ngSanitize',
	//'mgcrea.ngStrap'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home'		 , {templateUrl: 'partials/AppInforme/index.html',   controller: 'homeController'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);
