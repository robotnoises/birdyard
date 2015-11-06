(function (angular, Move) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', '$location', '$timeout', 'nodeService', 'breadcrumbService', 'stashService', '$mdDialog',
  
  function ($scope, $routeParams, $location, $timeout, nodeService, breadcrumbService, stashService, $mdDialog) {
    
    // Constants
    
    var SCROLL_SPEED = 250;
    var LAST_SELECTED_NODE = 'last_selected';
    
    // Private
    
    function init() {
      $timeout(function() {
        $scope.transitioning = false;
      }, 500);
    }
    
    function navigateToNode(nodeId) {
      $location.path('n/' + nodeId);
    }
    
    function wait(duration, callback) {
      $timeout(callback, duration);
    }
    
    function doTransition(callback) {
      
      var scrollSpeed = SCROLL_SPEED + 'ms';
            
      Move.y('.keep', {top: 340, speed: scrollSpeed, offset: true});
      
      wait(SCROLL_SPEED, function () {
        
        Move.y('.keep', {top: 0, speed: scrollSpeed});
        Move.y('.star-wars', {top: -300, speed: scrollSpeed});
        
        wait(SCROLL_SPEED + 100, callback);
      });
    }
    
    function setNodeFromFirebase(id) {
      
      // Wait until it's loaded, then set
      nodeService.get(id).$loaded(function (node) {
        $scope.node = node;
      });
    }
    
    function setNodeChildrenFromFirebase(id) {
      nodeService.getChildren(id).$loaded(function (children) {
        $scope.children = children;
        $timeout(function () {
          $scope.loaded = true;
        }, 0);
      });
    }
    
    function getNode(id) {
      
      var lsn = stashService.get(LAST_SELECTED_NODE);

      if (lsn) {
        if (lsn.id === id) {
          setNodeFromFirebase(id);
          return lsn;
        } else {
          return nodeService.get(id);
        }
      } else {
        return nodeService.get(id);
      }
    }

    // Scope
    
    $scope.transitioning = true;
    $scope.loaded = false;
    $scope.showDialog = false;
    $scope.selected = {};
    $scope.children = {};
    $scope.text = '';
    $scope.node = getNode($routeParams.id);
    
    setNodeChildrenFromFirebase($routeParams.id);
    
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
      
      // Flag as transitioning to the next node
      $scope.transitioning = true;
      
      // Duplicated child node
      var selected = angular.copy(child);
      $scope.selected = selected;
      stashService.set(LAST_SELECTED_NODE, selected);
      
      // Keep the clicked one
      var theChosenOne = angular.element(document.getElementById(child.id));
      theChosenOne.addClass('keep');
      
      // Fade the rest
      var children = angular.element(document.querySelectorAll('div.child:not(.keep)'));
      children.addClass('ghost');
      
      // Move stuff
      doTransition(function () {
        // Navigate
        navigateToNode(child.id);
      });
    };
    
    init();
    
  }]);
  
})(angular, Move);