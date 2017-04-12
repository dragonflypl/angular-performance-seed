(function() {
    angular.module('myApp.view1').directive('lazyBalance', function( $interpolate ) {
        function compile( tElement, tAttributes ) {
            var interpolation = $interpolate( tAttributes.lazyBalance );
            tAttributes.$set("lazyBalance", null );
            function link( scope, element, attributes ) {
                element.on(
                    "mouseenter",
                    function handleMouseEnterEvent() {
                        element.attr("title", interpolation( scope ) );
                    }
                );
            }
            // Return the linking function.
            return( link );
        }
        // Return the directive configuration.
        return({
            compile: compile,
            restrict: "A"
        });
    });
}())