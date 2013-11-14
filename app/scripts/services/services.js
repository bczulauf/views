'use strict';

var services = angular.module('appmaker.services',
    ['ngResource']);

services.factory('Page', ['$resource',
    function($resource) {
  return $resource('/pages/:id', {id: '@id'});
}]);

services.factory('LoadPages', ['Page', '$q',
    function(Page, $q) {
  return function() {
    var delay = $q.defer();
    Page.query(function(pages) {
      delay.resolve(pages);
    }, function() {
      delay.reject('Unable to fetch pages');
    });
    return delay.promise;
  };
}]);

services.factory('LoadPage', ['Page', '$route', '$q',
    function(Page, $route, $q) {
  return function() {
    var delay = $q.defer();
    Page.get({id: $route.current.params.pageId}, function(page) {
      delay.resolve(page);
    }, function() {
      delay.reject('Unable to fetch page '  + $route.current.params.pageId);
    });
    return delay.promise;
  };
}]);

services.factory('Todo', ['$resource', 
  function($resource) {
    return $resource('/todo', {})
  }
]);

services.factory('LoadTodos', ['Todo', '$q',
    function(Todo, $q) {
  return function() {
    var delay = $q.defer();
    Todo.query(function(todos) {
      delay.resolve(todos);
    }, function() {
      delay.reject('Unable to fetch todos');
    });
    return delay.promise;
  };
}]);