(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $routeParams, $timeout, uiService, roomService) {
    
    // Private
    
    var ROOMS_TO_LOAD = 50;
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.DARK);
      uiService.setBackgroundClass(uiService.BACKGROUND.GEOMETRY);
      
      roomService.getRooms($routeParams.category).then(function ($rooms) {
        $scope.rooms = $rooms;
        $scope.rooms.scroll.next(ROOMS_TO_LOAD);
        
        $scope.rooms.$loaded(function() {
          $timeout(function() {
            $scope.loaded = true;  
          });
        });
        
      });
    }
    
    init();
    
    // Public
    
    $scope.rooms = {};
    $scope.loaded = false;
    
    $scope.loadMore = function (amount) {
      if ($scope.rooms.scroll) {
        $scope.rooms.scroll.next(amount);
      } else {
        console.log($scope.rooms);
      }
    }

  }]);
  
})(angular);