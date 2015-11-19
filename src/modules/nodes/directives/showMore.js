(function (angular) {
  
  'use strict';
  
  // Private
  
  function textOverflow(element) {
    return element.clientHeight < element.scrollHeight;
  }
  
  function createShowMoreElement() {
    var el = angular.element('<i/>');
    el.addClass('icon icon-ellipsis-h show-more ghost fadey boo');
    return el;
  }
  
  angular.module('bebop.nodes')
  
  .directive('showMore', ['$timeout', '$compile', function ($timeout, $compile) {
    
    return {
      restrict: 'A',
      replace: false,
      scope: {
        loaded: '@'
      },
      link: function (scope, element, attrs) {
        
        scope.$watch('loaded', function (loaded) {
          if (loaded == 'false') return;
          if (textOverflow(element[0])) {
            var el = createShowMoreElement();
            el.attr('ng-click', 'doAction()');
            el.attr('ng-class', '{"boo": loaded}');
            el.attr('ng-show', '!expand')
            element.append($compile(el)(scope));
          }
        });
        
        scope.doAction = function () {
          scope.$parent.$eval(attrs['showMore']);
        };
      }
    }
  }]);
  
})(angular);