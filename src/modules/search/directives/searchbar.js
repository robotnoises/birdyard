(function (angular) {
  
  'use strict';
  
  angular.module('bebop.search')
  
  .directive('searchBar', ['searchService', function (searchService) {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/search/views/searchbar.html',
      link: function (scope, element, attrs) {
        
        // Bind keydown events
        element.bind('keydown', function (e) {
          
          var key = e.keyCode || e.charCode;
          
          // If the key is enter     
          if (key == 13) {
            searchService.search(scope.search, 'room');
          }
        });
        
      }
    }
  }]);
  
})(angular);