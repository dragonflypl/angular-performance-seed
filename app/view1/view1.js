'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($http, $scope, $interval) {

    var properties = {};

    $scope.load = function(num) {
    	fetchData(num);
    }

    $scope.show = function(item, property) {    	
        properties[property] = (properties[property] || 0) + 1;
    	return item[property];
    }

	$scope.load(1);

    function fetchData(num) {
	    $http.get('../data' +  num + '.json').then(function(response) {
	    	$scope.data = response.data;
	    })  
    }

    setInterval(function triggerDigest() {
        properties = {};
        $scope.data.forEach(function(x) {
            x.id += 1;
            if (x.balance) {
                x.balance = x.balance + 1
            }
        });

        $scope.$apply();
        for(let property in properties) {
            console.log(property + ' called ' + properties[property] + " times");
        }
    }, 3000);
});