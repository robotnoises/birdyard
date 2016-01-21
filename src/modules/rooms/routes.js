(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.rooms')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/rooms/c/everything', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });

    $routeProvider.when('/rooms/c/:category', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });
    
    $routeProvider.whenAuthenticated('/rooms/new', {
      controller: 'newroomController',
      templateUrl: 'modules/rooms/views/newroom.html',
      resolve: {
        user: ['$Auth', function ($Auth) {
          var $auth = $Auth;
          return $auth.$waitForAuth(); 
        }]
      }
    })
    
    $routeProvider.when('/', {
      redirectTo: '/rooms/c/everything'
    });

  }]);
  
})(angular);