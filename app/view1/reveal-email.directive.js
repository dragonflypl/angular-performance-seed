(function() {

	var template = "<a href=\"mailto:{{show(item, 'email')}}\">{{show(item, 'email')}}</a>";

	angular.module('myApp.view1').directive('revealEmail', function($compile) {
		return {
			controller: function($scope, $element) {	
				this.doAction = function() {
					$element.append($compile(template)($scope));
					$scope.$digest();					
				}
			}
		}
	});
}())