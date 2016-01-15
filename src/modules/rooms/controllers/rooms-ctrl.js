(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.rooms')
  
  .controller('roomsController', ['$scope', '$location', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $location, $routeParams, $timeout, uiService, roomService) {
    
    // Private
    
    var ROOMS_TO_LOAD = 25;
    var roomCount = 0;
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.DARK);
      
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
    
    $scope.categoryReadable = function (category) {
      var _category = category || $scope.category;
      return capitalize(roomService.getCategory(_category));
    };
    
    $scope.categoryColor = function (category) {
      
      var color;
      var _category = category || $scope.category;
      
      switch (_category) {
        case 0:
          color = 'bg-yellow';
          break;
        case 1:
          color = 'bg-red';
          break;
        case 2:
          color = 'bg-green';
          break;
        case 3:
          color = 'bg-orange';
          break;
        case 4:
          color = 'bg-blue';
          break;
        case 5:
          color = 'bg-purple';
          break;
        default:
          color = 'bg-yellow';
          break;
      }
      
      return color;
    }
    
    // Load more rooms
    $scope.loadMore = function (amount) {
      if ($scope.rooms.scroll) {
        $scope.loading = true;
        $scope.rooms.scroll.next(amount);
      } else {
        console.log($scope.rooms);
      }
    }
    
    // Go to a room (node)
    $scope.enterRoom = function (nodeId) {
      $timeout(function () {
        $location.path('n/' + nodeId);  
      }, 50);
    };
    
    $scope.changeCategory = function (category) {
      $timeout(function () {
        $scope.category = parseInt(category, 10);
      });
    };
  }]);
  
})(angular);