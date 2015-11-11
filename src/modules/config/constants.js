(function (angular) {
  
  'use strict';
  
  angular.module('bebop.config')
    
    // Limit on # of characters a node will initially display
    .constant('CHAR_LIMIT', 425)
    
    // App version
    .constant('VERSION', '0.0.1')
    
    // The configured Firebase
    .constant('FIREBASE', 'https://bebop-dev.firebaseio.com/');
  
})(angular);