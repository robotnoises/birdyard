(function (angular) {
  
  'use strict';
  
  angular.module('bbop.utilities')
  
  .directive('markdownFilter', ['$timeout', function($timeout) {
        
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        $timeout(function () {
          var limit = parseInt(attrs['markdownFilter'], 10) || 0;
          var text = element.text();
          var filtered = text.replace(/[#*_]|[-]{3,}|[=]{3,}|[!]+(?=[\[])|[\[\]]|\(([htpw]{3,}.*?)\)/gi, '');
          var limited = (limit) ? filtered.slice(0, limit) : filtered;
          element.text(limited);  
        });
      }
    }
  }]);
})(angular);
