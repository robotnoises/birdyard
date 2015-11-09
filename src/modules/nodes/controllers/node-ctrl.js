(function (angular, Move) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', '$routeParams', '$location', '$timeout', '$anchorScroll', '$window', 'nodeService', 'breadcrumbService', 'stashService', '$mdDialog',
  
  function ($scope, $routeParams, $location, $timeout, $anchorScroll, $window, nodeService, breadcrumbService, stashService, $mdDialog) {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GLobals & Constants ////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var SPEED = 200;
    var LAST_SELECTED_NODE = 'last_selected';
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope properties ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.transitioning =  true;
    $scope.autoScroll =     true;
    $scope.loaded =         false;
    $scope.showDialog =     false;
    $scope.selected =       {};
    $scope.children =       {};
    $scope.text =           '';
    $scope.node =           getNode($routeParams.id);
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Private functions //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function init() {
      
      // If the user switches autoscroll to true, scroll to the bottom
      $scope.$watch('autoScroll', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue) {
          scrollToBottom();
        }
      });

      angular.element($window).bind('scroll', checkBottom);
      
      // Fade-in various UI
      $timeout(function() {
        $scope.transitioning = false;
        scrollToBottom()
      }, SPEED * 2);
    }
    
    function navigateToNode(nodeId) {
      $location.path('n/' + nodeId);
    }
    
    function wait(duration, callback) {
      $timeout(callback, duration);
    }
    
    function focusTextInput() {
      if ($scope.showDialog) {
        $timeout(function () {
          angular.element(document.getElementById('text-input')).focus();
        }, SPEED * 2);
      }
    }
    
    function doTransition(callback) {
      
      var scrollSpeed = SPEED + 'ms';
      
      Move.y('.keep', {top: 240, speed: scrollSpeed, context: Move.CONTEXT.VIEWPORT, easing: 'linear'});
      
      wait(SPEED - 10, function () {
        
        Move.y('.keep', {top: 65, speed: scrollSpeed, easing: 'linear'});
        Move.y('.star-wars', {top: -200, speed: scrollSpeed, easing: 'linear'});
        
        wait(SPEED - 10, function () {
          Move.y('.keep', {top: 0, speed: scrollSpeed, easing: 'linear'});
          callback();
        });
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
        $scope.children.$watch(babySitter);
        
        $timeout(function () {
          $scope.loaded = true;
          scrollToBottom();
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
    
    function clearDialog() {
      $timeout(function () {
        $scope.showDialog = false;
        $scope.text = '';  
      }, 0);
    }
    
    function checkBottom() {
      
      $timeout(function() {
        
        var height = $window.innerHeight || document.documentElement.clientHeight; 
        var scroll = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollHeight = getScrollHeight();
        
        // If we're at the bottom & autoScroll is not enabled...
        if ((height + scroll) >= scrollHeight) {
          // enable it
          $scope.autoScroll = true;
        } else {
          // if we're not at the bottom & autoScroll is enabled, disable it.
          $scope.autoScroll = false;
        }
      }, SPEED);
    }
    
    function getScrollHeight() {
      return document.body.scrollHeight || document.documentElement.scrollHeight;    
    }
    
    function scrollToBottom(forceScroll) {
      if ($scope.autoScroll || forceScroll) {
        $timeout(function () {
          $window.scrollTo(0, getScrollHeight());  
        },0);
      }
    }
    
    function babySitter(snap) {
      if (snap.event === 'child_added') {
        scrollToBottom();
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope methods //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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
          
          clearDialog();
          
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
      
      // Move stuff
      doTransition(function () {
        // Navigate
        navigateToNode(child.id);
      });
      
      // Fade the rest
      var children = angular.element(document.querySelectorAll('div.child:not(.keep)'));
      children.addClass('ghost'); 
    };
    
    $scope.toggleDialog = function (force) {
      if (typeof force === 'boolean') {
        $scope.showDialog = force;
      } else {
        $scope.showDialog = !$scope.showDialog;
      }
      focusTextInput();
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Initialization /////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    init();
    
  }]);
  
})(angular, Move);