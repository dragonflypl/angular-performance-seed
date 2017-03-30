'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.view1',
  'myApp.view2'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
run(function($rootScope, $log) {

    var originalDigest = $rootScope.$digest.bind($rootScope);

    $rootScope.$digest = function() {
        $log.info("$rootScope.$digest starts");
        var t0 = performance.now();
        originalDigest();
        var t1 = performance.now();
        var elapsed = Math.round(t1 - t0);
        console[elapsed > 1000 ? 'warn' : 'info']("$rootScope.$digest " + elapsed + " ms.")
        console.trace();
    }
});

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
                    watchers.push({ watcher: watcher });
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