(function (angular) {
  
  'use strict';
  
  angular.module('bebop.config')
  
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    
    // Toast notification themes
    $mdThemingProvider.theme('toast-default')
    $mdThemingProvider.theme('toast-success');
    $mdThemingProvider.theme('toast-error');
    
  }]);
  
})(angular);





      