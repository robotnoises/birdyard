(function (angular) {
  
  'use strict';
  
  angular.module('bbop.config')
  
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    
    // Toast notification themes
    $mdThemingProvider.theme('toast-default')
    $mdThemingProvider.theme('toast-success');
    $mdThemingProvider.theme('toast-error');
    
    // Loaders
    $mdThemingProvider.theme('progress-default').primaryPalette('green', {
      'default': '400',
      'hue-1': '900'
    });
    
  }]);
  
})(angular);





      