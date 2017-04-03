(function() {

	var template = "<a href=\"mailto:{{show(item, 'email')}}\">{{show(item, 'email')}}</a>";

	angular.module('myApp.view1').directive('revealEmail', function($compile) {
		return {
			require: '^^userActions',
			link: function(scope, element, attrs, controller) {
				controller.registerEmailCell(element[0]);
			},
			controller: function($scope, $element) {	
				this.doAction = function() {
					$element.append($compile(template)($scope));
					$scope.$digest();					
				}
			}
		}
	});
}())