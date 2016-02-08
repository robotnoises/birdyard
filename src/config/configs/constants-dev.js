(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://birdyard-dev.firebaseio.com/')
    
    // The domain
    .constant('DOMAIN', 'http://localhost:8000/src/')
    
    // Keep the #
    .constant('HTML5MODE', false);
  
})(angular);