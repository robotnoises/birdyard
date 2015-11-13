(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .controller('logoController', ['$scope', '$routeParams', '$location', 'uiService',
  
  function ($scope, $routeParams, $location, uiService) {
    
    $scope.getLogoColor = function () {
      var value = uiService.getBackgroundValue();
      if (value === uiService.VALUE.LIGHT) {
        return 'font-purple';
      } else {
        return 'font-white';
      }
      
    };
    
    $scope.goHome = function () {
      $location.path('/');
    };
    
  }]);
  
})(angular);