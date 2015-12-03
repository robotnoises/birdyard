(function (angular) {
  
  'use strict';
  
  angular.module('bebop.users')
  
  .factory('authService', ['$rootScope', '$timeout', '$q', 'firebaseService', '$Auth', '$firebaseObject', 'colorService',

  function ($rootScope, $timeout, $q, firebaseService, $Auth, $firebaseObject, colorService) {
    
    // Private
    
    var $user = null;
    
    function getUser() {
      if ($user) {
       return $user;
      } else {
        $user = $Auth.$getAuth();
        return $user;
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
        handle:   '@' + authData[authData.provider].username,
        providerData: {
          // These represent defaults to the user's customizable fields...
          name:     authData[authData.provider].displayName,
          avatar:   authData[authData.provider].profileImageURL  
        },
      };
    }
    
    // Pre configure some properties for new users
    function formatNewUser(authData) {
      authData.accent = colorService.random();
      authData.social = false;
      return authData;
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
    function _signIn(authData) {
      return $q(function (resolve, reject) {
        var formatted = formatAuthData(authData);
        var $ref = firebaseService.getRef('users');
        $ref.on('value', function ($users) {
          if ($users.child(authData.uid).exists()) {
            // Update as to not overwrite existing properties
            var $user = $ref.child(authData.uid);
            $user.update(formatted);
            resolve(false); // Not a new user!
          } else {
            // Give the user a random color if they haven't chosen one
            var formattedNewUser = formatNewUser(formatted);
            $ref.child(authData.uid).set(formattedNewUser);
            resolve(true);  // New user!
          }
        });
      });
    }
    
    function _signOut() {
      return $q(function (resolve, reject) {
        $user = null;
        var $ref = firebaseService.getRef();
        $ref.unauth();
        resolve();
      });
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
        
        var _uid = null;
        
        if (uid) {
          _uid = uid;  
        } else {
          var _user = getUser();
          if (_user) {
            _uid = _user.uid;
          }
        }
        
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
          if ($user.avatar) {
            var avatar = $user.avatar || $user.providerData.avatar;
            resolve(avatar);  
          } else {
            resolve('');
          }
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