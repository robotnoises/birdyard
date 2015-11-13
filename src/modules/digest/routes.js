(function (angular) {
  
  'use strict';
  
  angular.module('bebop.digest')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A specific node
    $routeProvider.when('/d/all', {
      controller: 'digestController',
      templateUrl: 'modules/digest/views/digest.html'
    });
    
    // A specific node
    $routeProvider.when('/d/:category', {
      controller: 'digestController',
      templateUrl: 'modules/digest/views/digest.html'
    });
    
    // A specific node
    $routeProvider.when('/', {
      redirectTo: '/d/all/'
    });

  }]);
  
})(angular);