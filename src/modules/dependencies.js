// Register all module dependencies here

(function (angular) {

  'use strict';
  
  // Nodes
  angular.module('bbop.utilities', [
    'firebase'
  ]);
  
  // Search
  angular.module('bbop.search', [
    'firebase',
    'ngMaterial'
  ]);
  
  // Nodes
  angular.module('bbop.nodes', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Rooms
  angular.module('bbop.rooms', [
    'ngRoute',
    'firebase',
    'ngMaterial'
  ]);
  
  // Authentication
  angular.module('bbop.users', [
    'ngRoute',
    'firebase'
  ]);
  
  // Notifications
  angular.module('bbop.notifications', [
    'firebase',
    'ngMaterial'
  ]);
  
})(angular);