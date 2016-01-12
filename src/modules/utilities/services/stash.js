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
    
    // Public
    
    var _stashService = {};
    
    function _set(key, value) {
      if (key && value) {
        if (isObject(value)) {
          value = JSON.stringify(value);
        }
        $window.sessionStorage.setItem(key, value);
      } else {
        throw new Error('A Key and Value must be provided.');
      }
    }
    
    function _get(key) {
      if (key) {
        var value = $window.sessionStorage.getItem(key);
        if (isSerializedObject(value)) {
          return JSON.parse(value);
        } else {
          return value;
        } 
      } else {
        throw new Error('A Key must be provided.');
      }
    }
    
    function _exists(key) {
      if (key) {
        return !!$window.localStorage.getItem(key);  
      } else {
        throw new Error('A Key must be provided.');
      }
    }
    
    function _setLongTerm(key, value) {
      if (key && value) {
        if (isObject(value)) {
          value = JSON.stringify(value);
        }
        $window.localStorage.setItem(key, value);
      } else {
        throw new Error('A Key and Value must be provided.');
      }
    }
    
    _stashService.set = _set;
    _stashService.setLongTerm = _setLongTerm;
    _stashService.get = _get;
    _stashService.exists = _get;
        
    return _stashService;
    
  }]);
  
})(angular);
