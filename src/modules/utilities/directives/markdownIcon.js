(function (angular) {
  
  'use strict';
  
  var CHEATSHEET_URL = 'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet';
  
  angular.module('bebop.utilities')
  
  .directive('markdownIcon', ['$window', function ($window) {
    return {
      restrict: 'E',
      replace: false,
      template: 
        '<span class="markdown-icon" ng-click="showCheatsheet()">' +
          '<md-tooltip md-direction="top">Markdown Enabled</md-tooltip>' + 
          '<img src="assets/images/markdown.svg" />' +
        '</span>',
      
      link: function (scope, element, attrs) {
        scope.showCheatsheet = function () {
          var win = 'menubar=no,height=600,width=600';
          $window.open(CHEATSHEET_URL, 'Markdown Cheatsheet', win);
        };
      }
    }
  }]);
  
})(angular);