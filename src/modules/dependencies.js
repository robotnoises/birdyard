// Register all module dependencies here

(function (angular) {

  'use strict';

  // Config
  angular.module('bebop.config', [
    'firebase'
  ]);
  
  // Nodes
  angular.module('bebop.utilities', [
    'firebase'
  ]);
  
  // Nodes
  angular.module('bebop.nodes', [
    'ngRoute',
    'firebase'
  ]);
  
  // Digest
  angular.module('bebop.digest', [
    'ngRoute',
    'firebase'
  ]);
  
  // Authentication
  angular.module('bebop.auth', [
    'ngRoute',
    'firebase'
  ])
  
})(angular);