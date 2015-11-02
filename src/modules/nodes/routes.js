(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A list of top-level nodes
    $routeProvider.when('/n', {
      controller: 'nodeController',
      templateUrl: 'modules/nodes/views/nodes.html'
    });
    
    // A specific top-level node
    $routeProvider.when('/n/:pid', {
      controller: 'nodeController',
      templateUrl: 'modules/nodes/views/nodes.html'
    });
    
    // A child node
    $routeProvider.when('/n/:pid/:cid', {
      controller: 'nodeController',
      templateUrl: 'modules/nodes/views/nodes.html'
    });
    
  }]);
  
})(angular);