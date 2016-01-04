(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$location', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $location, $routeParams, $timeout, uiService, roomService) {
    
    // Private
    
    var ROOMS_TO_LOAD = 25;
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
            $scope.$watch('category', categoryWatcher);
            roomCount = $scope.rooms.length;
          });
        });
        
      });
    }
    
    function capitalize (input) {
      return input.replace(/(^[a-z])/,function (i) { return i.toUpperCase(); });
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
    }
    
    function categoryWatcher(category, oldCategory) {
      if (category !== oldCategory) {
        $location.path('rooms/c/' + roomService.getCategory(category));  
      }
    }
    
    // Public
    
    $scope.rooms =    {};
    
    $scope.roomsToLoad = ROOMS_TO_LOAD;
    
    $scope.loaded =   false;  // Initial load
    $scope.loading =  false;  // Loading more rooms
    
    $scope.category = roomService.getCategoryValue($routeParams.category) || 0;
    $scope.categoryReadable = capitalize(roomService.getCategory($scope.category));    
    
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