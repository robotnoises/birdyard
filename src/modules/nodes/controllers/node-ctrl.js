(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', 'nodeService', function ($scope, $routeParams, nodeService) {
    
    // Scope
    
    $scope.node = nodeService.get($routeParams.id);
    $scope.children = nodeService.getChildren($routeParams.id);
    
    $scope.text = '';
    
    $scope.pushText = function() {
      var formatted = nodeService.format($scope.text);
      $scope.children.$add(formatted);
    };
    
  }]);
  
})(angular);