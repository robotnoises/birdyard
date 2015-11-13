(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .controller('logoController', ['$scope', '$routeParams', 'uiService',
  
  function ($scope, $routeParams, uiService) {
    
    $scope.getLogoColor = function () {
      var value = uiService.getBackgroundValue();
      if (value === uiService.VALUE.LIGHT) {
        return 'font-purple';
      } else {
        return 'font-white';
      }
      
    };
    
  }]);
  
})(angular);