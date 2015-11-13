(function (angular) {
  
  'use strict';
  
  angular.module('bebop.auth')
  
  .controller('userController', ['$scope', 'firebaseService', 'authService', 'uiService',
  
  function ($scope, firebaseService, authService, uiService) {
    
    function init() {
      uiService.setBackgroundValue(uiService.VALUE.LIGHT);
    }
    
    init();
    
  }]);
  
})(angular);