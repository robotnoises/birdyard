(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.notifications')
  
  .factory('notificationService', ['$q', '$window', 'authService', 'firebaseService', '$firebaseArray', '$firebaseObject',
  
  function ($q, $window, authService, firebaseService, $firebaseArray, $firebaseObject) {
    
    // Private
    
    var $notifications = {};
    
    var _TYPE = Object.freeze({
      REPLY: 0,
      TROPHY: 1
    });
    
    function updateCount($event) {
      if ($event) {
        authService.getUser().then(function ($user) {
          var $ref = firebaseService.getRef('notifications', $user.uid);
          $ref.update({count: $notifications.length});
        }).catch(function(err) {
          console.error(err);
        });
      }
    }
    
    function init() {
      // Load-up notifications immediately
      authService.getUser().then(function ($user) {
        // Get unread notifications
        var $ref = firebaseService.getRef('notifications', $user.uid, 'items');
        return $firebaseArray($ref);
      }).then(function ($userNotifications) {
        $notifications = $userNotifications;
        $notifications.$watch(updateCount);
      }).catch(function(err) {
        console.error(err);
      });
    }
    
    init();
    
    // Public
    
    var _notificationService = {};
    
    function _notify(notificationType, where, userId, id) {
      
      return $q(function (resolve, reject) {
        // Todo check if this is the same user

        // Get a handle on the user to be notified
        var $items = firebaseService.getRef('notifications', userId, 'items');
        var now = $window.Firebase.ServerValue.TIMESTAMP;
        
        // Note: this will always overwrite existing notifications (we want that)
        $items.child(id).setWithPriority({
          'where': where,
          'type': notificationType,
          'id': id,
          'timestamp': now
        }, (0 - Date.now())); // sort descending
        
        return $items.on('child_added', function ($snap) {
          resolve();
        });

      });
    }
    
    // Effectively deletes a notification
    function _markRead(id) {
      return authService.getUser().then(function ($user) {
        // Get a handle on the user to be notified
        var $ref = firebaseService.getRef('notifications', $user.uid, 'items', id);
        $ref.remove();
      });     
    }
    
    function _readAll() {
      return authService.getUser().then(function ($user) {
        // Get a handle on the user to be notified
        var $ref = firebaseService.getRef('notifications', $user.uid);
        $ref.remove();
      });
    }
    
    function _get() {
      return authService.getUser().then(function ($user) {
        var $ref = firebaseService.getRef('notifications', $user.uid, 'items');
        return $firebaseArray($ref);
      });
    }
    
    _notificationService.TYPE = _TYPE;
    _notificationService.notify = _notify;
    _notificationService.read = _markRead;
    _notificationService.readAll = _readAll;
    _notificationService.get = _get;
    
    return _notificationService;
    
  }]);
  
})(angular);