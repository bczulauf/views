'use strict';

var app = angular.module('appmaker', ['appmaker.components', 'appmaker.directives', 'appmaker.services']);

app.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'RecipesCtrl',
        templateUrl:'/views/recipes.html'
      }).when('/design/:pageId', {
        controller: 'DesignCtrl',
        resolve: {
          pages: ["LoadPages", function(LoadPages) {
            return LoadPages();
          }
          ],
          currentPage: ["LoadPage", function(LoadPage) {
            return LoadPage();
          }
          ]
        },
        templateUrl:'/views/design.html'
      }).when('/new', {
        controller: 'NewPageCtrl',
        templateUrl:'/views/newPage.html'
      }).when('/newBlock', {
        controller: 'NewBlockCtrl',
        templateUrl:'/views/newBlock.html'
      }).otherwise({redirectTo:'/'});
});

app.controller("RecipesCtrl", function ($scope) {
	$scope.model = {
		message: "this is my app"
	}
})

app.controller('DesignCtrl', ['$scope', 'pages', 'currentPage',
    function($scope, pages, currentPage) {
  $scope.pages = pages;
  $scope.currentPage = currentPage;
}]);

app.controller("PageListCtrl", function ($scope) {

})

app.controller('NewPageCtrl', ['$scope', '$location', 'Page',
    function($scope, $location, Page) {
  $scope.page = new Page({
    content: ""
  });

  $scope.save = function() {
    $scope.page.$save(function(page) {
      $location.path('/design/' + page.id);
    });
  };

  $scope.back = function() {
    history.go(-1)
  };
}]);

app.controller("NewBlockCtrl", function ($scope) {
	$scope.model = {
		message: "new blocks here"
	}
})

app.controller("TodoCtrl", function ($scope, Todo, LoadTodos) {
  
  $scope.todos = Todo.query({}, function (data) {
    console.log(data)
  })

  $scope.save = function () {
    $scope.todo = new Todo({item:$scope.formTodoText, done:false});
    $scope.todo.$save(function(data) {
      console.log(data)
    });
    $scope.formTodoText = '';
  };

  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
})
