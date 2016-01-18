(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.users')
  
  .factory('presenceService', ['$q', 'firebaseService', 

  function ($q, firebaseService) {
    
    // Private
    
    var $userCountRef = firebaseService.getRef('presence/count');
    var _userCount = 0; 
    
    function init() {
      
      $userCountRef.on('value', function ($snap) {
        _userCount = $snap.val() || 0;
      });
      
      var $ref = firebaseService.getRef('.info/connected');
      
      $ref.on("value", function(snap) {
        if (snap.val() === true) {
          $userCountRef.push(true);
        }
      });
      
      $userCountRef.onDisconnect().remove();
    }
    
    init();
    
    // Public
    
    var _presenceService = {};
    
    function _getUserCount () {
      return _userCount;
    }
    
    _presenceService.getUserCount = _getUserCount;
    
    return _presenceService;
  }]);
  
})(angular);