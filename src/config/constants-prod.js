(function (angular) {
  
  'use strict';
  
  angular.module('bebop.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://bebop.firebaseio.com/');
  
})(angular);