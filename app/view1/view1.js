'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {

	let triggered = 0;

	$scope.name = "World";

	$scope.triggerDigest = function() {
	 	triggered = 0;
	}

	$scope.greeting = function greeting() {
		
		if (triggered < 10) {
			triggered += 1;
		}

		console.log("$scope.greeting was called", triggered);

		return 'Hello ' + $scope.name + ' ' + triggered;
	}
});