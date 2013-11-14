'use strict';

var components = angular.module('appmaker.components', []);

//Navbar element
components.directive("navbar", function () {
	return {
		restrict: "E",
		template: "<div class='moz-navbar'><div class='moz-page-title'>{{currentPage.title}}</div><a ng-href='/#/design/{{2}}'' class='moz-btn-menu'><span class='fui-list'></span></a></div>"
	}
});

//Menu element
components.directive("menulist", function () {
	return {
		restrict: "E",
		template: "<div class='moz-menu'><div ng-repeat='page in pages' class='moz-page'><a ng-href='/#/design/{{page.id}}'>{{page.title}}</a></div></div>"
	}
});

//Todos List
components.directive("todoslist", function () {
	return {
		restrict: "E",
		templateUrl: "/blocks/todolist.html"
		/*controller: function ($scope) {
			$scope.todos = [
        {text:'Learn AngularJS', done:false},
        {text:'Build an app', done:false}
    	];

    	$scope.getTotalTodos = function () {
        return $scope.todos.length;
    	};

		}*/
	}
});

//Form element
components.directive("mozform", function () {
	return {
		restrict: "E",
		templateUrl: "/blocks/form.html"
	}
});

components.directive("mozcounter", function () {
	return {
		restrict: "E",
		scope: {},
		controller: function ($scope) {
			$scope.data = {count: 0};

			this.countUp = function () {
				$scope.data.count++;
			}

			this.countDown = function () {

			}
		},
		link: function (scope, element) {
			element.bind("click", function () {
				scope.data.count;
				console.log(scope.data.count)
			});
		},
		templateUrl: "/blocks/mozCounter.html"
	}
})

components.directive("countUp", function () {
	return {
		require: "mozcounter",
		link: function(scope, element, attrs, mozCounterCtrl) {
			mozCounterCtrl.countUp();
		}
	}
})