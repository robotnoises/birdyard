(function (angular) {
  
  'use strict';
  
  angular.module('bbop.utilities')
  
  .directive('lightbox', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        imgurl: '@',
        showlightbox: '=showIf'
      },
      template: 
        '<div class="lightbox-wrapper" ng-class="{show: showlightbox}">' + 
          '<div class="lightbox" ng-style="{width: imgWidth}">' + 
            '<img ng-src="{{src}}" />' +
          '</div>' +
        '</div>',
      link: function (scope, element, attrs) {
        
        var $element = angular.element(element);
        
        scope.src = '';
        scope.imgWidth = 'auto';
        
        scope.close = function () {
          $element.removeClass('show');
        }
        
        scope.$watch('imgurl', function (value) {
          if (value) {
            scope.src = value;
          }
        });
        
        scope.$watch('showlightbox', function (value) {
          if (value) {
            scope.imgWidth = $element.find('img')[0].width;
            scope.showlightbox = (value === 'true' || value === true);
          }
        });
        
        element.on('click', function () {
          $timeout(function () {
            scope.showlightbox = false;  
          });
        });
      }
    }
  }]);
  
})(angular);