(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$routeParams', '$timeout', 'uiService', 'roomService',
  
  function ($scope, $routeParams, $timeout, uiService, roomService) {
    
    // Scope
    
    $scope.rooms = {};
    $scope.loaded = false;
    
    roomService.getRooms($routeParams.category).then(function ($rooms) {
      $scope.rooms = $rooms;
      $scope.rooms.$loaded(function () {
        $timeout(function () {
          $scope.loaded = true;  
        });
      });
    });
    
    // Private
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.DARK);
      uiService.setBackgroundClass(uiService.BACKGROUND.GEOMETRY);
    }
    
    init();

  }]);
  
})(angular);