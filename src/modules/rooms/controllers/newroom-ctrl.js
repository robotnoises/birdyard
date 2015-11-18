(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('newroomController', ['$scope', 'uiService', 'roomService', 'nodeService', 'breadcrumbService', '$mdToast',
  
  function ($scope, uiService, roomService, nodeService, breadcrumbService, $mdToast) {
    
    // Scope
    
    $scope.room = {};
    
    // Private
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
      uiService.setBackgroundClass(uiService.BACKGROUND.GEOMETRY);
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
      }).then(function () {
        // Display success message
        $mdToast.show(
          $mdToast.simple()
            .content('New room created!')
            .theme('toast-success')
            .position('bottom right')
            .hideDelay(3000)
          );
      }).catch(function(err) {
        console.error(err);
        
        // Display error message
        $mdToast.show(
          $mdToast.simple()
            .content('Something went wrong, please try again.')
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
      });
    };
    
  }]);
  
})(angular);