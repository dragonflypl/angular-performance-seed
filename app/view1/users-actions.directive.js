(function() {

	angular.module('myApp.view1').directive('userActions', function($compile) {
		return {
			controller: function($scope) {
				this.emailCells = [];	
				this.registerEmailCell = function(element) {
					this.emailCells.push(element);
				}	

				$scope.ctrl = this;
			},
			link: function(scope, element, attrs, controller) {
				var controller = scope.ctrl;
				element.on('mouseover', '.email-col', function(event) {
					var elementIndex = controller.emailCells.indexOf(event.currentTarget);
					if (elementIndex !== -1) {
						angular.element(event.currentTarget).controller('revealEmail').doAction();	
						controller.emailCells.splice(elementIndex, 1);
					}
				});

			
			}
		}
	});
}())