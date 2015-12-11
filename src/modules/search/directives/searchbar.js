(function (angular) {
  
  'use strict';
  
  angular.module('bebop.search')
  
  .directive('searchBar', function () {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/search/views/searchbar.html',
      link: function (scope, element, attrs) {
        
      }
    }
  });
  
})(angular);