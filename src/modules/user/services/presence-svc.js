(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.users')
  
  .factory('presenceService', ['$q', 'firebaseService', 

  function ($q, firebaseService) {
    
    // Private
    
    var $userCountRef = firebaseService.getRef('presence/count');
    
    function init() {
      
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
      return $q(function (resolve, reject) {
        $userCountRef.on('value', function ($snap) {
          var foo = $snap.numChildren();
          resolve(foo);
        }, reject);
      });
    }
    
    _presenceService.getUserCount = _getUserCount;
    
    return _presenceService;
  }]);
  
})(angular);