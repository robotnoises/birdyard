(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $routeParams, $timeout, uiService, roomService) {
    
    // Private
    
    var ROOMS_TO_LOAD = 2;
    var roomCount = 0;
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.DARK);
      uiService.setBackgroundClass(uiService.BACKGROUND.GEOMETRY);
      
      roomService.getRooms($routeParams.category).then(function ($rooms) {
        $scope.rooms = $rooms;
        $scope.rooms.scroll.next(ROOMS_TO_LOAD);
        
        $scope.rooms.$loaded(function() {
          $timeout(function() {
            $scope.loaded = true;
            $scope.rooms.$watch(roomWatcher);
            roomCount = $scope.rooms.length;
          });
        });
        
      });
    }
    
    init();
    
    // Watchers

    function roomWatcher() {
      // Hide the progress indicator when more rooms load
      if ($scope.loading) {
        if ($scope.rooms.length >= roomCount) {
          $scope.loading = false;
        }
      }
    };
    
    // Public
    
    $scope.rooms = {};                        // List of rooms
    
    $scope.loaded = false;                    // Initial load
    $scope.loading = false;                   // Loading more rooms
    $scope.category = $routeParams.category;  // What kind of rooms?
    
    // Load more rooms
    $scope.loadMore = function (amount) {
      if ($scope.rooms.scroll) {
        $scope.loading = true;
        $scope.rooms.scroll.next(amount);
      } else {
        console.log($scope.rooms);
      }
    }

  }]);
  
})(angular);