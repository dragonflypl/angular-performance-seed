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

function watchersFnk() { 
    var root = angular.element(document.getElementsByTagName('body'));

    var scopes = new WeakSet();

    var watchers = [];

    var f = function (element) {
        angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) { 
            if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                let scope = element.data()[scopeProperty];
                if (scopes.has(scope)) {
                    return;
                }
                scopes.add(scope);
                angular.forEach(scope.$$watchers, function (watcher) {
                    watchers.push({ watcher, exp: watcher.exp() });
                });
            }
        });

        angular.forEach(element.children(), function (childElement) {
            f(angular.element(childElement));
        });
    };

    f(root);

    console.log(watchers.length, watchers);
}

Object.defineProperty(window, 'watchers', {
    get: function() {
        watchersFnk();
    }
});