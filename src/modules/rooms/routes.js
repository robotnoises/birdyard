(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/rooms/c/everything', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });

    $routeProvider.when('/rooms/c/:category', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });
    
    $routeProvider.when('/rooms/new', {
      controller: 'newroomController',
      templateUrl: 'modules/rooms/views/newroom.html'
    })
    
    $routeProvider.when('/', {
      redirectTo: '/rooms/c/everything'
    });

  }]);
  
})(angular);