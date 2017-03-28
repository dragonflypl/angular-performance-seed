'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {

	let triggered = false;

	$scope.name = "World";

	$scope.triggerDigest = function() {
		triggered = true;
		console.log('$scope.triggerDigest');

		$scope.$evalAsync(function evalAsycCallback() {
			console.log('evalAsycCallback');
		})

		console.log('afterSchedulingEvalAsync');
	}

	$scope.greeting = function greeting() {	

		if (triggered) {
			triggered = false;
			$scope.$evalAsync(function evalAsycCallback() {
				console.log('evalAsycCallback inside $scope.greeting');
			});
		}

		console.log("$scope.greeting was called", triggered);		

		return 'Hello ' + $scope.name + ' ' + triggered;
	}
});