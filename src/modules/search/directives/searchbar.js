(function (angular) {
  
  'use strict';
  
  angular.module('bebop.search')
  
  .directive('searchBar', ['$timeout', '$location', 'searchService', 
    
    function ($timeout, $location, searchService) {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/search/views/searchbar.html',
      link: function (scope, element, attrs) {
        
        scope.results = [];
        
        scope.goTo = function (nodeId) {
          $timeout(function () {
            $location.path('/n/' + nodeId);  
          }, 300);
        };

        // Bind keydown events
        element.bind('keydown', function (e) {
          
          var key = e.keyCode || e.charCode;
          
          // If the key is enter     
          if (key == 13) {
            searchService.search(scope.search, 'room').then(function($results) {
              console.log($results);
              if ($results) {
                //$timeout(function () {
                  scope.results = $results.hits; 
                //});
              }
            }).catch(function (error) {
              console.error(error);
            });
          }
        });
        
      }
    }
  }]);
  
})(angular);