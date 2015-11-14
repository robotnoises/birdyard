(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A specific node
    $routeProvider.when('/d/all', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });
    
    // A specific node
    $routeProvider.when('/d/:category', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });
    
    // A specific node
    $routeProvider.when('/', {
      redirectTo: '/d/all/'
    });

  }]);
  
})(angular);