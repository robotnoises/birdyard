(function (angular, Move) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', '$location', '$timeout', 'nodeService', 'breadcrumbService', 
  
  function ($scope, $routeParams, $location, $timeout, nodeService, breadcrumbService) {
    
    // Private
    
    function navigateToNode(nodeId) {
      $location.path('n/' + nodeId);
    }
    
    // Scope
    
    $scope.node = nodeService.get($routeParams.id);
    $scope.children = nodeService.getChildren($routeParams.id);
    $scope.text = '';
    
    // Add a comment
    $scope.pushText = function() {
      
      var formatted = nodeService.format($scope.text);
      var $new = nodeService.push(formatted)
      
      $new.$loaded(function () {
        
        // This is a destination id, not the child pushId... may need to rename to make it a bit more obvious
        formatted.id = $new.id;
        
        $scope.children.$add(formatted).then(function ($snapshot) {
          
          $new.origin = $routeParams.id + '/children/' + $snapshot.key();
          $new.breadcrumb = breadcrumbService.push($new.id, angular.copy($scope.node.breadcrumb));
          
          return $new.$save();
        }).catch(function(err) {
          console.error(err);
        });
      });
    };
    
    // Navigate to a specific node
    $scope.goToNode = navigateToNode;
    
    // Navigate up one level in the breadcrumb
    $scope.goUp = function () {
      var index = $scope.node.breadcrumb.length - 2;
      var nodeId = $scope.node.breadcrumb[index];
      navigateToNode(nodeId);
    };
    
    // Fade all child nodes... except one.
    $scope.selectChild = function (childId) {
      var theChosenOne = angular.element(document.getElementById(childId));
      theChosenOne.addClass('keep');
      var children = angular.element(document.querySelectorAll('div.child:not(.keep)'));
      children.addClass('fade');
      Move.y('.keep', {top: '300px'});
    };
    
  }]);
  
})(angular, Move);