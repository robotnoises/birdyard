// Register all module dependencies here

(function (angular) {

  'use strict';
  
  // Nodes
  angular.module('bebop.utilities', [
    'firebase'
  ]);
  
  // Nodes
  angular.module('bebop.nodes', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Rooms
  angular.module('bebop.rooms', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Authentication
  angular.module('bebop.users', [
    'ngRoute',
    'firebase'
  ]);
  
  // Notifications
  angular.module('bebop.notifications', [
    'firebase',
    'ngMaterial'
  ]);
  
})(angular);