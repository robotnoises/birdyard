(function (angular) {
  
  'use strict';
  
  angular.module('bebop.notifications')
  
  .factory('notificationService', ['$q', 'authService', 'firebaseService', '$firebaseArray', 
  
  function ($q, authService, firebaseService, $firebaseArray) {
    
    // Private
    
    var $notifications = [];
    
    var _TYPE = Object.freeze({
      REPLY: 0,
      TROPHY: 1
    });
    
    function init() {
      // Load-up notifications immediately
      authService.getUser().then(function ($user) {
        // Get unread notifications
        var $ref = firebaseService.getRef('notifications', $user.uid, 'items');
        return $firebaseArray($ref);
      }).then(function ($userNotifications) {
        $notifications = $userNotifications;
      }).catch(function(err) {
        console.error(err);
      });
    }
    
    function updateCount(userId) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('notifications', userId);
        // $ref.on('value', function ($snap) {
        //   var count = $snap.numChildren();
          
        // });
      });
    }
    
    init();
    
    // Public
    
    var _notificationService = {};
    
    function _notify(notificationType, userId, id) {
      
      return $q(function (resolve, reject) {
        // Todo lodash this beast, check for duplicates
        // Todo check if this is the same user
        
        // Get a handle on the user to be notified
        // var $notifications = firebaseService.getRef('notifications', userId);
        var $items = firebaseService.getRef('notifications', userId, 'items');
        // var $item = firebaseService.getRef('notifications', userId, 'items', id)
        
        // Note: this will always overwrite existing notifications (we want that)
        $items.child(id).set({
          'type': notificationType,
          'id': id
        });
        
        return $items.on('child_added', function ($snap) {
          return updateCount(userId); 
        });

      });
    }
    
    // Effectively deletes a notification
    function _markRead(userId, id) {
      return $q(function (resolve, reject) {

        // Get a handle on the user to be notified
        var $ref = firebaseService.getRef('notifications', userId, id);
        
        $ref.remove();
        
        $ref.on('child_removed', function () {
          resolve();
        });
      });
    }
    
    _notificationService.TYPE = _TYPE;
    _notificationService.notify = _notify;
    _notificationService.read = _markRead;
    _notificationService.get = $notifications;
    
    return _notificationService;
    
  }]);
  
})(angular);