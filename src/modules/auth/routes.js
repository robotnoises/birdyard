(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A sign-in page
    $routeProvider.when('/signin', {
      controller: 'authController',
      templateUrl: 'modules/auth/views/signin.html'
    });
        
  }]);
  
})(angular);