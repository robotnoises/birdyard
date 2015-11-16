(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('newroomController', ['$scope', 'uiService', 'roomService', 'nodeService', 'breadcrumbService',
  
  function ($scope, uiService, roomService, nodeService, breadcrumbService) {
    
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
        $node.breadcrumb = breadcrumbService.push($node.$id);
        return $node.$save();
      }).then(function ($node) {
        return roomService.format($scope.room, $node.key());
      }).then(function(formatted) {
        return roomService.saveRoom(formatted);
      }).catch(function(err) {
        console.error(err);
      });
    };
    
  }]);
  
})(angular);