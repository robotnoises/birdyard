(function (angular) {
  
  'use strict';
  
  angular.module('bebop.notifications')
  
  .controller('notificationController', ['$scope', '$timeout', '$location', 'uiService', 'notificationService', '$mdSidenav',
  
  function ($scope, $timeout, $location, uiService, notificationService, $mdSidenav) {

    var $notifications = {};
    $scope.notify = false;
    
    // Private
        
    function watch() {
      $notifications.$watch(function ($event) {
        $scope.notify = ($notifications.length > 0);
      });
    }
    
    notificationService.getCount().then(function ($notifications) {
      return $notifications.$loaded(function ($loaded) {
        $notifications = $loaded;
        watch();
      })
    }).catch(function (err) {
      console.log(err);
    });
        
    // Public
        
    $scope.openNav = function () {
      $mdSidenav('foo').toggle();
    };
    
  }]);
  
})(angular);