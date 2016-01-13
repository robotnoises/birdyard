(function (angular) {
  
  'use strict';
  
  function select(field, start, end) {
    if (field.createTextRange) {
      var selRange = field.createTextRange();
      selRange.collapse(true);
      selRange.moveStart('character', start);
      selRange.moveEnd('character', end);
      selRange.select();
      field.focus();
    } else if (field.setSelectionRange) {
      field.focus();
      field.setSelectionRange(start, end);
    } else if (typeof field.selectionStart != 'undefined') {
      field.selectionStart = start;
      field.selectionEnd = end;
      field.focus();
    }
  }
  
  angular.module('birdyard.utilities')
  
  .factory('selectText', ['$window', '$timeout', function($window, $timeout) {
    return function (selector, start, end) {
      $timeout(function () {
        select($window.document.getElementById(selector), start, end);
      });
    }
  }]);
  
})(angular);

