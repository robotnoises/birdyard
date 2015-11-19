(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('activityService', ['$window', 'authService', 'firebaseService', '$firebaseObject', 
  
  function ($window, authService, firebaseService, $firebaseObject) {
    
    // Private
    
    // Check whether or not object is initialized to a value
    function init($obj) {
      $obj.$loaded(function($activity) {
        if (!$activity.lastActivity) {
          $activity.lastActivity = $window.Firebase.ServerValue.TIMESTAMP;
          $activity.$save();
        }
      });
    }

    // Public
    
    var _activityService = {};
    
    // returns a synchronized object
    function _get() {
      return authService.getUser().then(function ($user) {
        var $ref = firebaseService.getRef('users', $user.uid, "activity");
        var $activity = $firebaseObject($ref);
        init($activity);
        return $activity;
      });
    }
        
    _activityService.get = _get;
        
    return _activityService;
    
  }]);
  
})(angular);