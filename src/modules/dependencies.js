// Register all module dependencies here

(function (angular) {

  'use strict';
  
  // Nodes
  angular.module('birdyard.utilities', [
    'firebase'
  ]);
  
  // Search
  angular.module('birdyard.search', [
    'firebase',
  ]);
  
  // Nodes
  angular.module('birdyard.nodes', [
    'ngRoute',
    'firebase',
    'btford.markdown',
    'ngclipboard'
  ]);
  
  // Rooms
  angular.module('birdyard.rooms', [
    'ngRoute',
    'firebase'
  ]);
  
  // Authentication
  angular.module('birdyard.users', [
    'ngRoute',
    'firebase'
  ]);
  
  // Notifications
  angular.module('birdyard.notifications', [
    'firebase',
  ]);
  
})(angular);