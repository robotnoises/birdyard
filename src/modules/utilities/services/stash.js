(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .factory('stashService', ['$window', function ($window) {
    
    // Private
    
    function isObject(input) {
      if (input) {
        return typeof input === 'object';
      } else {
        return false;
      }
    }
    
    function isSerializedObject(input) {
      if (input) {
        try {
          var deserialized = JSON.parse(input);
          return isObject(deserialized);  
        } catch(ex) {
          return false;
        }
      } else {
        return false;
      }
    }
    
    function getPattern(keyPattern, storageType) {
      
      var items = $window[storageType];
      var keys = Object.keys(items);
      var matched = {};
      
      for (var i = 0, max = keys.length; i < max; i++) {
        var k = keys[i];
        var value = items[k];
        
        if (isSerializedObject(value)) {
          value = JSON.parse(value);
        }
        
        if (k.match(keyPattern)) {
          matched[value.id] = value;
        }
      }
      
      return matched;
    }
    
    function get(key, storageType) {
      
      var value;
      
      if (key) {
        // If it's a RegExp...
        if (typeof key === 'object') {
          value = getPattern(key, storageType);
        } else {
          // Maybe it's a string? (Todo)
          value = $window[storageType].getItem(key);
          if (isSerializedObject(value)) {
            value = JSON.parse(value);
          }
        }
      } else {
        throw new Error('A Key must be provided.');
      }
      
      return value;
    }

    function set(key, value, storageType) {
      if (key && value) {
        if (isObject(value)) {
          value = JSON.stringify(value);
        }
        $window[storageType].setItem(key, value);
      } else {
        throw new Error('A Key and Value must be provided.');
      }
    }
    
    // Public
    
    var _stashService = {};
    
    function _exists(key) {
      if (key) {
        return !!$window.localStorage.getItem(key) || !!$window.sessionStorage.getItem(key);  
      } else {
        throw new Error('A Key must be provided.');
      }
    }
    
    function _get(key) {
      get(key, 'sessionStorage');
    }
    
    function _getLongTerm(key) {
      get(key, 'localStorage');
    }
    
    function _set(key, value) {
      set(key, value, 'sessionStorage');
    }
    
    function _setLongTerm(key, value) {
      set(key, value, 'localStorage');
    }
    
    _stashService.set = _set;
    _stashService.setLongTerm = _setLongTerm;
    _stashService.get = _get;
    _stashService.getLongTerm = _getLongTerm;
    _stashService.exists = _exists;
        
    return _stashService;
    
  }]);
  
})(angular);
