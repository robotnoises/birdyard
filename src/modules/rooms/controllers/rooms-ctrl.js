(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$routeParams', 'uiService', 'roomService',
  
  function ($scope, $routeParams, uiService, roomService) {
    
    // Scope
    
    $scope.rooms = {};
    $scope.loaded = false;
    
    roomService.getRooms($routeParams.category).then(function ($rooms) {
      $scope.rooms = $rooms;
      $scope.loaded = true;
    });
    
    // Private
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
      uiService.setBackgroundClass(uiService.BACKGROUND.GEOMETRY);
    }
    
    init();

  }]);
  
})(angular);