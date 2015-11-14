(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .controller('roomsController', ['$scope', '$routeParams', 'uiService',
  
  function ($scope, $routeParams, uiService) {
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
  }]);
  
})(angular);