(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.config')
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://birdyard.firebaseio.com/')
    
    // The domain
    .constant('DOMAIN', 'https://birdyard.co/')
    
    // Get rid of the #
    .constant('HTML5MODE', true);
  
})(angular);