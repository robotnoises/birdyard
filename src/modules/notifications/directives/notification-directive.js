(function (angular) {
  
  'use strict';
  
  angular.module('bebop.notifications')
  
  .directive('notifications', function () {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/notifications/views/notifications.html',
      controller: ['$scope', '$location', '$timeout', 'notificationService', '$mdDialog', 
      
      function ($scope, $location, $timeout, notificationService, $mdDialog) {
        
        var $originatorEvent;
        
        $scope.notifications = {};
        $scope.count = 0;
        
        function watch() {
          $scope.notifications.$watch(function ($event) {
            if ($event) {
              console.log($event);
            }
          });
        }
        
        notificationService.get().then(function ($notifications) {
          return $notifications.$loaded(function ($loaded) {
            $scope.notifications = $loaded;
            $scope.count = angular.copy($loaded.length);
            watch();
          })
        }).catch(function (err) {
          console.log(err);
        });
        
        $scope.openMenu = function ($mdOpenMenu, $event) {
          $originatorEvent = $event;
          $mdOpenMenu($event);
        };
        
        $scope.go = function (id) {
          // todo mark read
          $timeout(function () {
            $location.path('/n/' + id);
          });
        };
      }]
    }
  });
  
})(angular);