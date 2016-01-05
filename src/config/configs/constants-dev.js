(function (angular) {
  
  'use strict';
  
  angular.module('bbop.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://bbop-dev.firebaseio.com/');
  
})(angular);