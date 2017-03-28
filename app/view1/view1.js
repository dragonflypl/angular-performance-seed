'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {

	let obj = { title: 'Foo' };

	$scope.mutate = function() {
		obj.title += obj.title;
	}

	$scope.changeRef = function() {
		obj = { title: 'Foo' };
	}

	$scope.$watch(function() {
		console.log("nonstrict-expressionCalled")
		return obj;
	}, function(newVal, oldVal) {
		if (newVal === oldVal) {
			return;
		}
		console.log("nonstrict-watcherCalled");
	}, true);

	$scope.$watch(function() {
		console.log("strict-expressionCalled")
		return obj;
	}, function(newVal, oldVal) {
		if (newVal === oldVal) {
			return;
		}
		console.log("strict-watcherCalled");
	});

});