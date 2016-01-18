(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .factory('markdownFilterService',  function () {
    
    var _markdownFilter = {};
    
    function _fliter(input) {
      if (typeof input === 'string') {
        return input.replace(/[#*_>]|[-]{3,}|[=]{3,}|[!]+(?=[\[])|[\[\]]|\(([htpw]{3,}.*?)\)/gi, '');  
      } else {
        throw new Error('Input must be a string.');
      }
    }
    
    _markdownFilter.filter = _fliter;
    
    return _markdownFilter;
  });
  
})(angular);