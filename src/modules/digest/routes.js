(function (angular) {
  
  'use strict';
  
  angular.module('bebop.digest')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A specific node
    $routeProvider.when('/', {
      controller: 'digestController',
      templateUrl: 'modules/digest/views/digest.html'
    });

  }]);
  
})(angular);