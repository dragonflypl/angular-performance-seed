(function() {

	angular.module('myApp.view1').directive('userActions', function($compile) {
		return {
			controller: function($scope) {
				this.emailCells = new WeakSet();	
				this.registerEmailCell = function(element) {
					this.emailCells.add(element);
				}	

				$scope.ctrl = this;
			},
			link: function(scope, element, attrs, controller) {
				var controller = scope.ctrl;
				element.on('mouseover', '.email-col', function(event) {					
					if (controller.emailCells.has(event.currentTarget)) {
						angular.element(event.currentTarget).controller('revealEmail').doAction();	
						controller.emailCells.delete(event.currentTarget);
					}
				});		
			}
		}
	});
}())