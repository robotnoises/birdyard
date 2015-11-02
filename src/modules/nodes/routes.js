(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // A list of top-level nodes
    $routeProvider.when('/n', {
      controller: 'nodeController',
      templateUrl: 'modules/nodes/views/nodes.html'
    });
    
    // A specific node
    $routeProvider.when('/n/:id', {
      controller: 'nodeController',
      templateUrl: 'modules/nodes/views/nodes.html'
    });
        
  }]);
  
})(angular);