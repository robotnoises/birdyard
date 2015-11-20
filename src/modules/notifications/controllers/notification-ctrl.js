(function (angular) {
  
  'use strict';
  
  angular.module('bebop.notifications')
  
  .controller('notificationController', ['$scope', '$timeout', 'notificationService',
  
  function ($scope, $timeout, notificationService) {
    $scope.notifications = {};
    
    notificationService.get().then(function ($notifications) {
      return $notifications.$loaded();
    }).then(function ($loaded) {
      $scope.notifications = $loaded;
    }).catch(function (err) {
      console.log(err);
    });

    $scope.openMenu = function (foo, bar) {
      
    };
    
    $scope.go = function () {
      
    };
    
  }]);
  
})(angular);