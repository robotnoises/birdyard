(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .controller('uiController', ['$scope', '$routeParams', '$location', 'uiService',
  
  function ($scope, $routeParams, $location, uiService) {
    
    $scope.getLogoColor = function () {
      var value = uiService.getBackgroundValue();
      if (value === uiService.VALUE.LIGHT) {
        return 'font-purple';
      } else {
        return 'font-white';
      }
    };
    
    $scope.getBackgroundClass = function () {
      return uiService.getBackgroundClass();
    };
    
    $scope.goHome = function () {
      $location.path('/');
    };
    
  }]);
  
})(angular);