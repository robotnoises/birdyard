(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .directive('formattingToolbar', ['$timeout', 'selectText', 'stashService', 
    
    function ($timeout, selectText, stashService) {
      
    return {
      restrict: 'E',
      replace: true,
      scope: {
        target: '='
      },
      templateUrl: 'modules/utilities/views/formattingToolbar.html',
      link: function (scope, element, attrs) {
        
        // Private
        
        var RECENT_NODES_PREFIX = '___recentNode_';
        
        function insertMarkdown(input) {
          if (scope.target) {
            scope.target = scope.target + '\n\n' + input;  
          } else {
            scope.target = input;
          }
        }
        
        function getRecentNodes() {
          return stashService.get(new RegExp(RECENT_NODES_PREFIX + '+'));
        }
        
        // Scope
        
        scope.headerIconHovering =  false;
        scope.linkIconClicked =     false;
        scope.recentNodes =         [];
        scope.recentNodes =         getRecentNodes();
        
        scope.insertMedia = function () {
          
          var linkText = '![](http://link-to-image-here/)';
          
          insertMarkdown(linkText);
          
          selectText(
            'text-input', 
            scope.target.length - 27, 
            scope.target.length - 1
          );
        };
        
        scope.insertFormatting = function (_type) {
          
          var bold = '**YOUR-BOLD-TEXT**';
          var italics = '*YOUR-ITALICIZED-TEXT*';
          var heading = ' YOUR HEADING';
          var blockquote = '> YOUR BLOCKQUOTE';
          
          if (_type === 'bold') {
            insertMarkdown(bold);
          } else if (_type === 'italic') {
            insertMarkdown(italics);
          } else if (_type === 'blockquote') { 
            insertMarkdown(blockquote)
          } else if (_type === 'header1') {
            insertMarkdown('#' + heading);  
          } else if (_type === 'header2') {
            insertMarkdown('##' + heading);
          } else if (_type === 'header3') {
            insertMarkdown('###' + heading);
          } else if (_type === 'header4') {
            insertMarkdown('####' + heading);
          } else if (_type === 'header5') {
            insertMarkdown('#####' + heading);
          }
          
          scope.headerIconHovering = scope.linkIconHovering = false;
        };
        
        scope.insertNodeLink = function (node) {
          scope.linkIconClicked = false;
          var stripped = node.text.split('\n').join('');
          insertMarkdown('> Posted by **' + node.name + '**:');
          insertMarkdown('> [' + stripped + '](#/n/' + node.id + ')');
        };
      }
    }
  }]);
  
})(angular);