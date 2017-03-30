'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($http, $scope, $interval) {

    $scope.load = function(num) {
    	fetchData(num);
    }

    $scope.show = function(item, property) {    	
    	return item[property];
    }

	$scope.load(1);

    function fetchData(num) {
	    $http.get('../data' +  num + '.json').then(function(response) {
	    	$scope.data = response.data;
	    })  
    }
});