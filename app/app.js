'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


function watchersOne() {
    var root = $('body');
    var watchers = [];
    var f = function(element) {
        if (element.data().hasOwnProperty('$scope')) {
            angular.forEach(element.data().$scope.$$watchers, function(watcher) {
                watchers.push(watcher);
            });
        }
        angular.forEach(element.children(), function(childElement) {
            f($(childElement));
        });
    };
    f(root);
    console.log(watchers.length);
}


function watchersTwo() { 
    var root = angular.element(document.getElementsByTagName('body'));

    var watchers = [];

    var f = function (element) {
        angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) { 
            if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                    watchers.push(watcher);
                });
            }
        });

        angular.forEach(element.children(), function (childElement) {
            f(angular.element(childElement));
        });
    };

    f(root);

    // Remove duplicate watchers
    var watchersWithoutDuplicates = [];
    angular.forEach(watchers, function(item) {
        if(watchersWithoutDuplicates.indexOf(item) < 0) {
             watchersWithoutDuplicates.push(item);
        }
    });

    console.log(watchersWithoutDuplicates, watchersWithoutDuplicates.length);
}

window.watchers = function() {
	watchersOne();
	watchersTwo();
}