(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .directive('markdownFilter', ['$timeout', 'markdownFilterService', function($timeout, markdownFilterService) {
        
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        $timeout(function () {
          var limit = parseInt(attrs['markdownFilter'], 10) || 0;
          var text = element.text();
          var filtered = markdownFilterService.filter(text);
          var limited = (limit) ? filtered.slice(0, limit) : filtered;
          element.text(limited);  
        });
      }
    }
  }]);
})(angular);
