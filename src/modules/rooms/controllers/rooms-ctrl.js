(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$location', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $location, $routeParams, $timeout, uiService, roomService) {
    
    // Private
    
    var ROOMS_TO_LOAD = 50;
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
    
    function getCategory(value) {
      var v = parseInt(value, 10);
      switch(v) {
        case 0:
          return 'everything';
          break;
        case 1:
          return 'news';
          break;
        case 2:
          return 'entertainment';
          break;
        case 3:
          return 'sports';
          break;
        case 4:
          return 'games';
          break;
        case 5:
          return 'whatever';
          break;
        default:
          return 'everything';
      }
    }
    
    function getCategoryValue(category) {
      switch(category) {
        case 'everything':
          return 0;
          break;
        case 'news':
          return 1;
          break;
        case 'entertainment':
          return 2;
          break;
        case 'sports':
          return 3;
          break;
        case 'games':
          return 4;
          break;
        case 'whatever':
          return 5;
          break;
        default:
          return 0;
      }
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
    };
    
    function categoryWatcher(category, oldCategory) {
      if (category !== oldCategory) {
        $location.path('rooms/c/' + getCategory(category));  
      }
    }
    
    // Public
    
    $scope.rooms =    {};
    
    $scope.loaded =   false;  // Initial load
    $scope.loading =  false;  // Loading more rooms
    
    $scope.category = getCategoryValue($routeParams.category) || 0;
    $scope.categoryReadable = capitalize(getCategory($scope.category));    
    
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