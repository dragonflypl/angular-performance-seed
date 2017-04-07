(function() {

	angular.module('myApp.view1').directive('balanceAnimation', function($compile) {

		function animate(element, scope) {
			if (elementInViewport(element)) {
				element.classList.add('balance-animation');	
			} else {
				element.classList.remove('balance-animation');
			}
		}

		return {
			restrict: 'A',
			link: function(scope, element, attrs, controller) {
				animate(element[0], scope);	
				window.addEventListener('scroll', function() {
					animate(element[0], scope);					
				});		
			}
		}
	});

	function elementInViewport(el) {
	  var top = el.offsetTop;
	  var left = el.offsetLeft;
	  var width = el.offsetWidth;
	  var height = el.offsetHeight;

	  while(el.offsetParent) {
	    el = el.offsetParent;
	    top += el.offsetTop;
	    left += el.offsetLeft;
	  }

	  return (
	    top >= window.pageYOffset &&
	    left >= window.pageXOffset &&
	    (top + height) <= (window.pageYOffset + window.innerHeight) &&
	    (left + width) <= (window.pageXOffset + window.innerWidth)
	  );
	}

}())
