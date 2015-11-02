(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', 'nodeService', 'breadcrumbService', 
  
  function ($scope, $routeParams, nodeService, breadcrumbService) {
    
    // Scope
    
    $scope.node = nodeService.get($routeParams.id);
    $scope.children = nodeService.getChildren($routeParams.id);
    $scope.text = '';
    
    $scope.pushText = function() {
      
      var formatted = nodeService.format($scope.text);
      var $new = nodeService.push(formatted)
      
      $new.$loaded(function () {
        
        // This is a destination id, not the child pushId... may need to rename to make it a bit more obvious
        formatted.id = $new.id;
        
        $scope.children.$add(formatted).then(function ($snapshot) {
          
          $new.origin = $routeParams.id + '/children/' + $snapshot.key();
          $new.breadcrumb = breadcrumbService.push($new.id, $scope.node.breadcrumb);
          
          return $new.$save();
        }).catch(function(err) {
          console.error(err);
        });
      });
    };
    
  }]);
  
})(angular);