'use strict';

var app = angular.module('appmaker', ['appmaker.directives', 'appmaker.services']);

app.config(function ($routeProvider) {
  $routeProvider.
    when('/', {
      controller: 'ListCtrl', 
      resolve: {
        components: function (LoadComponents) {
          return LoadComponents();
        }
      },
      templateUrl: '/views/list.html'
    }).when('/component/:componentId', {
      controller: 'ViewCtrl',
      resolve: {
        component: function (LoadComponent) {
          return LoadComponent();
        }
      },
      templateUrl: '/views/viewComponent.html'
    }).when('/new', {
      controller: 'NewCtrl',
      templateUrl:'/views/componentForm.html'
    }).otherwise({redirectTo: '/'});
});

app.controller('ListCtrl', function ($scope, components) {
  $scope.components = components;
});

app.controller('ViewCtrl', function ($scope, component) {
  $scope.component = component;
});

app.controller('NewCtrl', function ($scope, Component, $location) {
  $scope.component = new Component();

  $scope.save = function() {
    $scope.component.$save(function(component) {
      $location.path('/component/' + component.id);
    });
  };

  $scope.back = function() {
    history.go(-1)
  };
});
