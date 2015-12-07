(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .directive('thumbnail', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element, attrs) {
        
        function launch() {
          window.open(this.src);
        }
        
        $timeout(function () {
          var imgs = angular.element(element[0]).find('img');
          angular.forEach(imgs, function (i) {
            var img = angular.element(i);
            img.parent().addClass('thumbnail');
            img.on('click', launch);
          });
        });
      }
    }
  }]);
  
})(angular);