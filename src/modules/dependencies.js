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
    'ngMaterial'
  ]);
  
  // Nodes
  angular.module('birdyard.nodes', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Rooms
  angular.module('birdyard.rooms', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Authentication
  angular.module('birdyard.users', [
    'ngRoute',
    'firebase'
  ]);
  
  // Notifications
  angular.module('birdyard.notifications', [
    'firebase',
    'ngMaterial'
  ]);
  
})(angular);