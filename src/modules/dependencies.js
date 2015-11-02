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
  
})(angular);