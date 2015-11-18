(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('uiService', function () {
    
    // Enums
    
    var _VALUE = Object.freeze({
      LIGHT: 0,
      DARK: 1
    });
    
    var _BACKGROUND = Object.freeze({
      GEOMETRY: 'bg-geometry'
    })
    
    // Private
    
    var _backgroundValue = _VALUE.LIGHT;
    var _backgroundClass = '';
    
    // Public
    
    var _ui = {};
    
    function _getBackgroundValue() {
      return _backgroundValue;
    }
    
    function _setBackgroundValue(value) {
      if (value == _VALUE.LIGHT || value == _VALUE.DARK) {
        _backgroundValue = value;  
      } else {
        throw new TypeError('The parameter was not a valid value.');
      }
    }
    
    function _getBackgroundClass () {
      return _backgroundClass;
    }
    
    function _setbackgroundClass(cls) {
      if (cls === _BACKGROUND.GEOMETRY || !cls) { // class can be nothing
        _backgroundClass = cls; 
      } else {
        throw new TypeError('The parameter was not a valid value.');
      }
    }
    
    _ui.VALUE = _VALUE;
    _ui.BACKGROUND = _BACKGROUND;
    _ui.getBackgroundValue = _getBackgroundValue;
    _ui.setBackgroundValue = _setBackgroundValue;
    _ui.getBackgroundClass = _getBackgroundClass;
    _ui.setBackgroundClass = _setbackgroundClass;
    
    return _ui;
    
  });
  
})(angular);