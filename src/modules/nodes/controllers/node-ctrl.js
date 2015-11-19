(function (angular, Move) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', [
    '$scope', 
    '$routeParams', 
    '$location', 
    '$timeout', 
    '$anchorScroll', 
    '$window', 
    'nodeService', 
    'breadcrumbService', 
    'stashService', 
    'uiService',
    'activityService', 
    '$mdDialog', 
    '$mdToast',
  
  function (
    $scope, 
    $routeParams, 
    $location, 
    $timeout, 
    $anchorScroll, 
    $window, 
    nodeService, 
    breadcrumbService, 
    stashService, 
    uiService,
    activityService, 
    $mdDialog, 
    $mdToast) {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GLobals & Constants ////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var SPEED = 200;
    var LAST_SELECTED_NODE = 'last_selected';
    var wasScrolling = false;
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope properties ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.autoScroll =     true;
    $scope.loaded =         false;
    $scope.showDialog =     false;
    $scope.expand =         false;
    $scope.selected =       {};
    $scope.$children =      {};
    $scope.$activity =      {};
    $scope.text =           '';
    $scope.node =           getNode($routeParams.id);
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Private functions //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function init() {
      
      uiService.setBackgroundValue(uiService.VALUE.DARK);
      uiService.setBackgroundClass('');
      
      // If the user switches autoscroll to true, scroll to the bottom
      $scope.$watch('autoScroll', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue) {
          scrollToBottom();
        }
      });

      angular.element($window).bind('scroll', checkBottom);
      
      activityService.get().then(function ($activity) {
        $scope.$activity = $activity;
      }).catch(function (err) {
        console.error(err);
      });
      
      $timeout(function() {
        scrollToBottom()
      }, SPEED / 2);
    }
    
    function navigateToNode(nodeId) {
      $timeout(function() {
        $location.path('n/' + nodeId);  
      });
    }
    
    function focusTextInput() {
      if ($scope.showDialog) {
        $timeout(function () {
          angular.element(document.getElementById('text-input')).focus();
        }, SPEED * 2);
      }
    }
    
    function doTransition(callback) {
      
      var options = {
        top: 300, 
        speed: SPEED, 
        context: Move.CONTEXT.VIEWPORT, 
        easing: 'ease-in'
      };
      
      // Callback hell!
      Move.y('.keep', options, function () {
        
        var keepOptions = {top: 30, speed: SPEED, easing: 'linear'};
        var starWarsOptions = {top: -270, speed: SPEED, easing: 'linear'};
        
        Move.y('.keep', keepOptions);
        Move.y('.star-wars', starWarsOptions, function () {
          var $keeper = angular.element(document.getElementsByClassName('keep'));
          $keeper[0].style.setProperty('opacity', 0, 'important');
          callback();
        });
      });
    }
    
    function setNodeFromFirebase(id) {
      // Wait until it's loaded, then set
      nodeService.getById(id).$loaded(function (node) {
        $scope.node = node;
      });
    }
    
    function setNodeChildrenFromFirebase(id) {
      nodeService.getChildren(id).$loaded(function (children) {
        
        $scope.$children = children;
        $scope.$children.$watch(babySitter);
        
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
          return nodeService.getById(id);
        }
      } else {
        return nodeService.getById(id);
      }
    }
    
    function clearDialog() {
      $timeout(function () {
        $scope.text = '';  
      });
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
    
    function updateCommentCount(operand) {
      var operation = parseInt(operand, 10);
      var updatedCount = angular.copy(($scope.node.commentCount + operation));
      
      // Update node
      $scope.node.commentCount = updatedCount;
      $scope.node.$save();
      
      if ($scope.node.origin) {
        nodeService.getByPath($scope.node.origin).$loaded(function ($snap) {
          $snap.commentCount = updatedCount;
          $snap.$save();
        });
      }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope methods //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    setNodeChildrenFromFirebase($routeParams.id);
    
    // Add a comment
    $scope.pushText = function() {
      
      var _formattedNode = {};
      var _$new = {};
      
      $scope.showDialog = false;
      
      nodeService.format($scope.text).then(function (formatted) {
        _formattedNode = formatted;
        return nodeService.push(formatted);
      }).then(function ($new) {
        _$new = $new;
        return _$new.$loaded();
      }).then(function () {
        _formattedNode.id = _$new.id;
        return $scope.$children.$add(_formattedNode);
      }).then(function ($snapshot) {
        _$new.origin = 'nodes/' + $routeParams.id + '/children/' + $snapshot.key();
        _$new.breadcrumb = breadcrumbService.push(_$new.id, angular.copy($scope.node.breadcrumb));
        return _$new.$save();
      }).then(function() {
        clearDialog();
        return updateCommentCount('+1');
      }).then(function () {
        
        // Display success message
        $mdToast.show(
          $mdToast.simple()
            .content('Posted!')
            .theme('toast-default')
            .position('bottom right')
            .hideDelay(1500)
          );
      }).catch(function(err) {
        
        var msg = 'Something went wrong, please try again.';
        
        console.error(err);
                
        if (err.code.indexOf('PERMISSION_DENIED') > -1) {
          msg = 'Slow down. You\'re doing that too much.';
        }
        
        // Display error message
        $mdToast.show(
          $mdToast.simple()
            .content(msg)
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
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
      $scope.loaded = false;
      
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
    
    $scope.pauseAutoScroll = function (pause) {
      if (pause) {
        wasScrolling = angular.copy($scope.autoScroll);
        $scope.autoScroll = false;
      } else if (!pause && wasScrolling) {
        $scope.autoScroll = true;
      }
    };
    
    $scope.expandFeature = function ($element) {
      $timeout(function () {
        $timeout(function () {
          $scope.expand = true;
        });  
      });
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Initialization /////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    init();
    
  }]);
  
})(angular, Move);