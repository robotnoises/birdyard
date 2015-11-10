(function (angular) {
  
  'use strict';
  
  // Private
  
  function getEndOfLastWord(str, limit) {
    var chars = str.split('');
    for (var i = limit - 1; i--;) {
      if (chars[i] === ' ') return i;
    }
  }
  
  function truncate(str, limit) {
    
    if (typeof str === 'string') {
      
      if (str.length <= limit) {
        return str;
      }
      
      // find the last character allowed by the limit
      var truncated = str.slice(0, limit);
      var lastChar = truncated.slice(limit - 1);
      
      if (lastChar === ' ') {
        return truncated;
      } else {
        return truncated.slice(0, getEndOfLastWord(truncated, limit));
      }
    } else {
      throw new TypeError('Input must be a string.');
    }
  }
  
  angular.module('bebop.nodes')
  
  .directive('showMore', function () {
    
    return {
      restrict: 'E',
      template: '<p>{{truncatedText}} &nbsp;<a href ng-show="truncated" ng-click="doAction()">Show More</a></p>',
      replace: true,
      scope: {
        text: '=',
        action: '=',
        limit: '='
      },
      link: function (scope, element, attrs) {
        
        scope.truncated = false;
        scope.truncatedText = '';
        
        function evalText(text) {
          if (text) {
            if (scope.limit && text.length > scope.limit) {
              scope.truncated = true;
              scope.truncatedText = truncate(text, scope.limit);  
            } else {
              scope.truncatedText = text;
            }
          }
        }
        
        scope.$watch('text', evalText);
        
        scope.$watch('limit', function (newLimit, oldLimit) {
          if (newLimit !== oldLimit) {
            evalText(scope.text);
          }
        });
             
        scope.doAction = function () {
          scope.$parent.$eval(scope.action);
        };
      }
    }
  });
  
})(angular);