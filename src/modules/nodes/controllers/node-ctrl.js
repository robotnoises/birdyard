(function (angular, Move) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', '$location', '$timeout', 'nodeService', 'breadcrumbService', 
  
  function ($scope, $routeParams, $location, $timeout, nodeService, breadcrumbService) {
    
    // Constants
    
    var SPEED = 300;
    
    // Private
    
    function navigateToNode(nodeId) {
      $location.path('n/' + nodeId);
    }
    
    function doTransition() {
      
      var scrollSpeed = SPEED + 'ms';
            
      Move.y('.keep', {top: 340, speed: scrollSpeed, offset: true, easing: 'ease-in'});
      
      // Move the chosen one to the top
      $timeout(function () {
        Move.y('.keep', {top: 0, speed: scrollSpeed});
        Move.y('.star-wars', {top: -300, speed: scrollSpeed });
      }, SPEED);
    }
    
    // Scope
    
    $scope.node = nodeService.get($routeParams.id);
    $scope.children = nodeService.getChildren($routeParams.id);
    $scope.selected = {};
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
    $scope.selectChild = function (child) {
      // Duplicated child node
      $scope.selected = angular.copy(child);      
      // Keep the clicked one
      var theChosenOne = angular.element(document.getElementById(child.id));
      theChosenOne.addClass('keep');
      // Fade the rest
      var children = angular.element(document.querySelectorAll('div.child:not(.keep)'));
      children.addClass('fade');
      // Move stuff
      doTransition();
    };
    
  }]);
  
})(angular, Move);