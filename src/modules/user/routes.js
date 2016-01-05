(function (angular) {
  
  'use strict';
  
  angular.module('bbop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // Current User's profile
    $routeProvider.whenAuthenticated('/user/', {
      controller: 'userController',
      templateUrl: 'modules/user/views/user.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth();
        }]
      }
    });
    
    // Any User's public profile
    $routeProvider.when('/user/:userid', {
      controller: 'userController',
      templateUrl: 'modules/user/views/user.html'
    });
        
  }]);
  
})(angular);