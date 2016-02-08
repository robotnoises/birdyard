/*! ngclipboard - v1.1.0 - 2016-02-03
* https://github.com/sachinchoolur/ngclipboard
* Copyright (c) 2016 Sachin; Licensed MIT */

/* Edited by David Nichols */

(function(angular, Clipboard) {
  
  'use strict';
  
  angular.module('birdyard')
  
  .directive('ngclipboard', function() {
    return {
      restrict: 'A',
      scope: {
        ngclipboardSuccess: '&',
        ngclipboardError: '&'
      },
      link: function(scope, element) {
        
        var clipboard = new Clipboard(element[0]);

        clipboard.on('success', function(e) {
          scope.ngclipboardSuccess({
            e: e
          });
        });

        clipboard.on('error', function(e) {
          scope.ngclipboardError({
            e: e
          });
        });

      }
    };
  });
}(angular, Clipboard));