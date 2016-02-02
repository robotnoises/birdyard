(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.rooms')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/c/everything', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });

    $routeProvider.when('/c/:category', {
      controller: 'roomsController',
      templateUrl: 'modules/rooms/views/rooms.html'
    });
    
    $routeProvider.whenAuthenticated('/c', {
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
      redirectTo: '/c/everything'
    });

  }]);
  
})(angular);