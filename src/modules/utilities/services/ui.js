(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .factory('uiService', function () {
    
    // Enums
    
    var _VALUE = Object.freeze({
      LIGHT: 0,
      DARK: 1
    });
    
    // Private
    
    var _backgroundValue = _VALUE.DARK;
    var _backgroundClass = '';
    
    // Public
    
    var _ui = {};
    
    function _getBackgroundValue() {
      return _backgroundValue;
    }
    
    function _setBackgroundValue(value) {
      if (value === _VALUE.LIGHT || value === _VALUE.DARK) {
        _backgroundValue = value;  
      } else {
        throw new TypeError('The parameter was not a valid value.');
      }
    }
    
    function _getBackgroundClass () {
      return _backgroundClass;
    }
    
    _ui.VALUE = _VALUE;
    _ui.getBackgroundValue = _getBackgroundValue;
    _ui.setBackgroundValue = _setBackgroundValue;
    _ui.getBackgroundClass = _getBackgroundClass;
   
    return _ui;
    
  });
  
})(angular);