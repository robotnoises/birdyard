(function (angular, Move) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .controller('nodeController', [
    '$scope', 
    '$routeParams', 
    '$location', 
    '$timeout', 
    '$anchorScroll', 
    '$window', 
    'firebaseService',
    'nodeService', 
    'roomService',
    'breadcrumbService', 
    'stashService', 
    'uiService',
    'activityService',
    'notificationService',
    'authService',
    '$mdToast',
    'meta',
    'backdropService',
  
  function (
    $scope, 
    $routeParams, 
    $location, 
    $timeout, 
    $anchorScroll, 
    $window, 
    firebaseService,
    nodeService, 
    roomService,
    breadcrumbService, 
    stashService, 
    uiService,
    activityService,
    notificationService,
    authService,
    $mdToast,
    meta,
    backdropService) {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GLobals & Constants ////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var $bottom;    
    var SPEED = 200;
    var wasScrolling = false;
    var LAST_SELECTED_NODE = 'last_selected';
    var RECENT_NODES_PREFIX = '___recentNode_';
    var MODE = Object.freeze({
      REPLY: 0,
      EDIT: 1
    });
            
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope properties ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.autoScroll =     true;
    $scope.loaded =         false;
    $scope.showDialog =     false;
    $scope.expand =         false;
    $scope.transitioning =  false;
    $scope.owned =          false;
    $scope.selected =       {};
    $scope.$children =      {};
    $scope.$activity =      {};
    $scope.reply =          '';
    $scope.mode =           MODE.REPLY;
    $scope.node =           getNode($routeParams.id);
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Private functions //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function loaded(isLoaded) {
      
      $timeout(function () {
        $scope.loaded = isLoaded;  
        scrollToBottom();
      }, 500);
      
      var replyNow = stashService.get('replyNow') === "true";
      
      if (replyNow) {
        stashService.set('replyNow', false);
        $timeout(function () {
          $scope.toggleDialog();
        }, 500);
      }
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
    
    function addRecentNode() {
      
      // Todo: move this or rename this function?
      meta.setTitle('Talking about ' + $scope.node.name + '\'s Comment...')
      
      var prefix = RECENT_NODES_PREFIX + $scope.node.id;
      var key = prefix + $scope.node.id;
      
      if (!stashService.exists(key)) {
        stashService.set(key, {
          id: $scope.node.id,
          text: $scope.node.text.slice(0, 250) + '...',
          name: $scope.node.name,
          timestamp: new Date().getTime()
        });
      }
    }
    
    function doTransition(callback) {
      
      var options = {
        top: 285, 
        speed: SPEED, 
        context: Move.CONTEXT.VIEWPORT, 
        easing: 'ease-in'
      };
      
      $scope.transitioning =  true;
      
      // Callback hell!
      Move.y('.keep', options, function () {
          
        var keepOptions = {top: 30, speed: SPEED, easing: 'linear'};
        var starWarsOptions = {top: -275, speed: SPEED, easing: 'linear'};
        
        Move.y('.keep', keepOptions, function () {
          var $keeper = angular.element(document.getElementsByClassName('keep'));
          $keeper[0].style.setProperty('display', 'none', 'important');
        });
        
        Move.y('.star-wars', starWarsOptions, callback);
      });
    }
    
    function setNodeChildrenFromFirebase(id) {
      nodeService.getChildren(id).$loaded(function (children) {
        
        $scope.$children = children;
        $scope.$children.$watch(babySitter);
        
        loaded(true);
      });
    }
    
    function getNode(id) {
      
      var lsn = stashService.get(LAST_SELECTED_NODE);
      var $node = nodeService.getById(id);
      
      $node.$loaded(function () {
        $scope.node = $node;  
      });
      
      if (lsn && lsn.id === id) {
        return lsn;
      }
    }
    
    function resetDialog() {
      $timeout(function () {
        $scope.reply = '';
        $scope.mode = MODE.REPLY;
      });
    }
    
    function getScrollHeight() {
      return document.body.scrollHeight || document.documentElement.scrollHeight;    
    }
    
    function scrollToBottom(callback) {
      if ($scope.autoScroll) {
        $timeout(function () {
          
          if (!$bottom) {
            $bottom = $window.document.getElementById('bottom');
          }
          
          try {
            $bottom.scrollIntoView({block: "end", behavior: "instant"});
          } catch (ex) {
            // Swallow exception
          }
          
          if (callback) {
            callback();
          }
         }, 100);
      }
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
    
    function babySitter(snap) {
      if (snap.event === 'child_added') {
        scrollToBottom();
      }
    }
    
    function updateCommentCount(operand) {
      try {
        var operation = parseInt(operand, 10);
        var updatedCount = angular.copy(($scope.node.commentCount + operation));
        
        // Update node
        $scope.node.commentCount = updatedCount;
        $scope.node.$save();
        
        // Update the child (origin)
        if ($scope.node.origin) {
          nodeService.getByPath($scope.node.origin).$loaded(function ($snap) {
            $snap.commentCount = updatedCount;
            $snap.$save();
          });
        }
        
        // Update the associated room
        if ($scope.node.originRoom) {
          
          var $roomRef = firebaseService.getRef($scope.node.originRoom);
          
          $roomRef.once('value', function ($snap) {
            var room = $snap.val();
            var updatedRoomCount = room.commentCount + operation;
            room.commentCount = updatedRoomCount;
            return roomService.update(room);
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    function toggleDialog(force) {
      
      if (typeof force === 'boolean') {
        $scope.showDialog = force;
      } else {
        $scope.showDialog = !$scope.showDialog;
      }
      
      if ($scope.showDialog) {
        focusTextInput();
        backdropService.set(true, 4, $scope.toggleDialog);
      } else {
        // Just in case they exit by hitting the escape button
        backdropService.reset();
      }
    }
    
    function checkOwner() {
      authService.getUser().then(function (user) {
        // Check to see if current user owns the featured comment
        if (user.uid === $scope.node.uid) {
          $scope.owned = true;
        }
      });
    }
    
    function init() {
      
      meta.setTitle('Talking about...');
      
      // If the user switches autoscroll to true, scroll to the bottom
      $scope.$watch('autoScroll', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue) {
          scrollToBottom();
        }
      });
      
      // Watch for the node load...
      $scope.$watch('node', function (value) {
        if (value && value.$loaded) {
          value.$loaded(addRecentNode);
          setNodeChildrenFromFirebase($routeParams.id);
          checkOwner();
        }
      });
      
      activityService.get().then(function ($activity) {
        $scope.$activity = $activity;
      }).catch(function (err) {
        console.error(err);
      });
      
      // Bind scroll events to a handler that checks to see if the user has 
      // scrolled all the way to the bottom
      angular.element($window).bind('scroll', checkBottom);
      
      // Scroll to the bottom, plz
      $timeout(scrollToBottom);
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Scope methods //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $scope.handleReply = function () {
      if ($scope.mode === MODE.REPLY) {
        $scope.pushText();
      } else if ($scope.mode === MODE.EDIT) {
        $scope.update();
      }
    };
    
    // Add a comment
    $scope.pushText = function () {
      
      // Do not proceed if the user has not entered text
      if (!$scope.reply) {
        return;
      }
      
      var _formattedNode = {};
      var _$new = {};
      
      $scope.toggleDialog(false);
      
      return nodeService.format($scope.reply).then(function (formatted) {
        _formattedNode = formatted;
        return nodeService.push(formatted);
      }).then(function ($new) {
        _$new = $new;
        return _$new.$loaded();
      }).then(function () {
        _formattedNode.id = _$new.id;
        _formattedNode.originRoom = $scope.node.originRoom;
        return $scope.$children.$add(_formattedNode);
      }).then(function ($snapshot) {
        _$new.origin = 'nodes/' + $routeParams.id + '/children/' + $snapshot.key();
        _$new.originRoom = $scope.node.originRoom;
        _$new.breadcrumb = breadcrumbService.push(_$new.id, angular.copy($scope.node.breadcrumb));
        return _$new.$save();
      }).then(function() {
        resetDialog();
        return updateCommentCount('+1');
      }).then(function () {

        // Notify the user
        var copiedNode =    angular.copy($scope.node);
        var text =          copiedNode.text.slice(0,150);
        var nodeId =        copiedNode.id;
        var userToNotify =  copiedNode.uid;
        var location =      '/n/' + nodeId;
        
        return notificationService.notify(notificationService.TYPE.REPLY, text, userToNotify, nodeId, location);
        
      }).then(function () {
        
        // Display success message
        $mdToast.show(
          $mdToast.simple()
            .content('Posted!')
            .theme('toast-success')
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
    
    $scope.update = function () {
      
      // Copy the new text
      var newText = angular.copy($scope.reply);
      var origin = angular.copy($scope.node.origin);
      
      // Update the text of the existing node
      $scope.node.text = newText;
      $scope.node.timestamp = $window.Firebase.ServerValue.TIMESTAMP;
      $scope.node.edited = true;
      
      // Toggle the dialog
      $scope.toggleDialog(false);
      
      // Save the change
      return $scope.node.$save().then(function ($ref) {
        // Save the origin node the exact same way
        if (origin) {
          var $originRef = nodeService.getByPath(origin);
          return $originRef.$loaded(function () {
            $originRef.text = newText;
            $originRef.timestamp = $window.Firebase.ServerValue.TIMESTAMP;
            $originRef.edited = true;
            return $originRef.$save();  
          });
        } else {
          return;
        }
      }).then(function () {
        
        resetDialog();
        
        // Display success message
        $mdToast.show(
          $mdToast.simple()
            .content('Edited!')
            .theme('toast-success')
            .position('bottom right')
            .hideDelay(1500)
          );
        
      }).catch(function (err) {
        
        console.error(err);
        
        resetDialog();
        
        // Display error message
        $mdToast.show(
          $mdToast.simple()
            .content('Something went wrong, please try again.')
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
      })
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
      stashService.set(LAST_SELECTED_NODE, selected);
      
      $timeout(function () {
        $scope.selected = selected;  
      });
      
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
      children.css({'display': 'none'});
    };
    
    $scope.toggleDialog = function (force) {
      $scope.mode = MODE.REPLY;
      toggleDialog(force);
    };
    
    $scope.toggleEdit = function (force) {
      $scope.mode = MODE.EDIT;
      $scope.reply = $scope.node.text;
      toggleDialog(force);
    }
    
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
        $scope.expand = true;
      });  
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Initialization /////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    init();
    
  }]);
  
})(angular, Move);