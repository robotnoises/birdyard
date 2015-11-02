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
      var $node = nodeService.push(formatted)
      
      $node.$loaded(function () {
        
        // This is a destination id, not the child pushId... may need to rename to make it a bit more obvious
        formatted.id = $node.id;
        
        $scope.children.$add(formatted).then(function ($snapshot) {
          $node.origin = $routeParams.id + '/children/' + $snapshot.key();
          return $node.$save();
        }).catch(function(err) {
          console.error(err);
        });
      });
    };
    
  }]);
  
})(angular);