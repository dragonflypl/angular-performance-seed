(function() {

	angular.module('myApp.view1').directive('userActions', function($compile) {
		return {
			link: function(scope, element) {
				element.on('click', '.email-col', function(event) {
					angular.element(event.target).controller('revealEmail').doAction();
				});
			}
		}
	});
}())