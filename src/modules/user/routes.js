(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A sign-in page
    $routeProvider.when('/user/signin', {
      controller: 'authController',
      templateUrl: 'modules/user/views/signin.html'
    });
        
  }]);
  
})(angular);