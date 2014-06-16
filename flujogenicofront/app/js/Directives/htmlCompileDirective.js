flujoApp.directive('htmlCompileDirective', function($compile, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        scope.$watch(attr.content, function() {
          element.html($parse(attr.content)(scope));
          $compile(element.contents())(scope);
        }, true);
      }
    }
});