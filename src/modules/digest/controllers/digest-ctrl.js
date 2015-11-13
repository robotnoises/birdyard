(function (angular) {
  
  'use strict';
  
  angular.module('bebop.digest')
  
  .controller('digestController', ['$scope', '$routeParams', 'uiService',
  
  function ($scope, $routeParams, uiService) {
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
  }]);
  
})(angular);