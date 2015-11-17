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
  angular.module('bebop.auth', [
    'ngRoute',
    'firebase'
  ])
  
})(angular);