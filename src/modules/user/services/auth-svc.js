(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .factory('authService', ['$rootScope', '$timeout', '$q', 'firebaseService', '$firebaseAuth', '$firebaseObject',

  function ($rootScope, $timeout, $q, firebaseService, $firebaseAuth, $firebaseObject) {
    
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
    
    // Scrub-away any extra or sensitive data, store only what we need
    function formatAuthData(authData) {
      // Their Bebop-custom properties (name and avatar) will be set later-on
      return {
        uid:      authData.uid,        
        expires:  authData.expires,
        provider: authData.provider,
        language: authData[authData.provider].cachedUserProfile.lang || 'en',
        handle:   authData[authData.provider].username,
        providerData: {
          // These represent defaults to the user's customizable fields...
          name:     authData[authData.provider].displayName,
          avatar:   authData[authData.provider].profileImageURL  
        },
      };
    }
    
    // Sub-in provider data props if user has not chosen their own... 
    // E.g. A Bebop user can have a different display name than their display name in Twitter,
    // but if they choose not to, it will default to the twitter displayName.
    function formatUserData(userData) {
      userData.name = userData.name || userData.providerData.name;
      userData.avatar = userData.avatar || userData.providerData.avatar;
      return userData;
    }
    
    // Public
    
    var _authService = {};
    
    // Set user data after auth
    function _signIn(authData, callbackUrl) {
      // Todo: do something with the callback?
      return $q(function (resolve, reject) {
        var formatted = formatAuthData(authData);
        var $ref = firebaseService.getRef('users');
        $ref.on('value', function ($users) {
          if ($users.child(authData.uid).exists()) {
            // Update as to not overwrite existing properties
            var $user = $ref.child(authData.uid);
            $user.update(formatted)
            resolve(false); // Not a new user
          } else {
            $ref.child(authData.uid).set(formatted);
            resolve(true);  // New user!
          }
        });
      });
    }
    
    function _signOut() {
      $auth = null;
      var $ref = firebaseService.getRef();
      $ref.unauth();
    }
    
    function _updateUser(userData) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('users', userData.uid);
        $ref.update(userData);
        resolve();
      });
    }
    
    function _getUser(uid) {
      return $q(function (resolve, reject) {
        var _uid = uid || getAuth().uid;
        if (_uid) {
          var $ref = firebaseService.getRef('users', _uid); 
          $ref.on('value', function ($user) {
            resolve(formatUserData($user.val()));
          });
        }
      });
    }
    
    function _getAvatar() {
      return $q(function (resolve, reject) {
        _getUser().then(function($user) {
          var avatar = $user.avatar || $user.providerData.avatar;
          resolve(avatar);
        });
      });
    }
    
    _authService.signIn = _signIn;
    _authService.signOut = _signOut;
    _authService.updateUser = _updateUser;
    _authService.getUser = _getUser;
    _authService.getAvatar = _getAvatar;
    
    return _authService;
  }]);
  
})(angular);