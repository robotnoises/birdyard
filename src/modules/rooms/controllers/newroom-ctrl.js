(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('newroomController', ['$scope', 'uiService', 'roomService', 'nodeService',
  
  function ($scope, uiService, roomService, nodeService) {
    
    // Scope
    
    $scope.room = {};
    
    // Private
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
    // Public
    
    $scope.newRoom = function () {
      nodeService.format($scope.room.text).then(function (formatted) {
        return nodeService.push(formatted);
      }).then(function ($node) {
        return roomService.format($scope.room, $node.$id);
      }).then(function(formatted) {
        return roomService.saveRoom(formatted);
      }).catch(function(err) {
        console.error(err);
      });
    };
    
  }]);
  
})(angular);