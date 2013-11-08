var app = angular.module('app');

app.config(function ($routeProvider) {
	$routeProvider.
		when('/', {
			controller: 'HomeCtrl',
			templateURL: 'views/home.html'
	}).when('/design', {
		controller: 'DesignCtrl',
		templateURL: 'views/design.html'
	})
});