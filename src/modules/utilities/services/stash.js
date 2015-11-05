(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('stashService', function () {
    
    // Public
    
    var _stashService = {};
    
    function _set(key, value) {
      if (key && value) {
        window.sessionStorage.setItem(key, value);  
      } else {
        throw new Error('A Key and Value must be provided.');
      }
    }
    
    function _get(key) {
      if (key) {
        return window.sessionStorage.getItem(key);  
      } else {
        throw new Error('A Key must be provided.');
      }
    }
    
    function _exists(key) {
      if (key) {
        return !!window.getItem(key);  
      } else {
        throw new Error('A Key must be provided.');
      }
    }
    
    _stashService.set = _set;
    _stashService.get = _get;
    _stashService.exists = _get;
        
    return _stashService;
    
  });
  
})(angular);