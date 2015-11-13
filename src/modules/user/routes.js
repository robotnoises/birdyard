(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // Current User's profile
    $routeProvider.when('/user', {
      controller: 'userController',
      templateUrl: 'modules/user/views/user.html'
    });
    
    // Any User's public profile
    $routeProvider.when('/user/:userid', {
      controller: 'userController',
      templateUrl: 'modules/user/views/user.html'
    });
    
    // A sign-in page
    $routeProvider.when('/user/signin', {
      controller: 'authController',
      templateUrl: 'modules/user/views/signin.html'
    });
        
  }]);
  
})(angular);