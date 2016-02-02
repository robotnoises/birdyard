(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://birdyard-dev.firebaseio.com/')
    
    // Keep the #
    .constant('HTML5MODE', false);
  
})(angular);