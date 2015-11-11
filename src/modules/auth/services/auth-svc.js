(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .factory('authService', ['$rootScope', '$timeout', '$q', 'firebaseService', '$firebaseAuth', 

  function ($rootScope, $timeout, $q, firebaseService, $firebaseAuth) {
    
    // Private
    
    var $auth = null; 
    
    function getAuth() {
      if (!$rootScope.signedIn) {
        return null;
      } else if ($auth) {
       return $auth;
      } else {
        $auth = $firebaseAuth(firebaseService.getRef()).$getAuth();
        return $auth;
      }
    }
    
    // Public
    
    var _authService = {};
    
    function _getUser() {
      return $q(function (resolve, reject) {
        var $auth = getAuth();
        if ($auth) {
          var $ref = firebaseService.getRef('users', $auth.uid); 
          $ref.on('value', function ($user) {
            resolve($user.val());
          });
        }
      });
    }
    
    _authService.getUser = _getUser;
    
    return _authService;
  }]);
  
})(angular);