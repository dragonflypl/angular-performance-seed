'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.filter('customLinky', function($filter) {
    var linkify = $filter('linky');
    var customLinky = function(value) {
        customLinky.counter += 1;
        return linkify(value);
    }
    customLinky.counter = 0;
    return customLinky;
})
.controller('View1Ctrl', function($log, $http, $scope, $interval, $filter) {

    var properties = {};
    var customLinky = $filter('customLinky');

    $scope.search = {};

    $scope.load = function(num) {
    	fetchData(num);
    }

    $scope.propsFilter = function(user) {
        $scope.propsFilterCounter += 1;
        if ($scope.search.email) {
            return user.email.indexOf($scope.search.email) !== -1;
        }
        return true;
    }

    $scope.propsFilterCounter = 0;

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
        // NO MODEL UPDATES!
        // $scope.data.forEach(function(x) {
        //     x.id += 1;
        // });
        $scope.propsFilterCounter = 0;
        customLinky.counter = 0;
        $scope.$apply();
        for(let property in properties) {
            console.log(property + ' called ' + properties[property] + " times");
        }
        $log.info('customLinky called ' + customLinky.counter + " times");
        $log.warn('$scope.propsFilter.couter called ' + $scope.propsFilterCounter + " times");
    }, 3000);
});