(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.config')
  
  .config(['$mdThemingProvider', function ($mdThemingProvider) {
    
    // Define Palettes
    
    // $mdThemingProvider.definePalette('by-grey', {
    //   '50': 'fafafa',
    //   '100': 'f7f7f7',
    //   '200': 'eeeeee',
    //   '300': 'dddddd',
    //   '400': 'cccccc',
    //   '500': 'dddddd',
    //   '600': 'e53935',
    //   '700': 'd32f2f',
    //   '800': 'c62828',
    //   '900': 'b71c1c',
    //   'A100': 'ff8a80',
    //   'A200': 'ff5252',
    //   'A400': 'ff1744',
    //   'A700': 'd50000',
    // });
    
    // Toast notification themes
    $mdThemingProvider.theme('toast-default')
    $mdThemingProvider.theme('toast-success');
    $mdThemingProvider.theme('toast-error');
    
    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('amber');
    
    // Loaders
    $mdThemingProvider.theme('progress-default').primaryPalette('green', {
      'default': '500',
      'hue-1': '900'
    });
    
  }]);
  
})(angular);





      