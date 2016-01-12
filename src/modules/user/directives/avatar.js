(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.users')
  
  .directive('avatar', ['$timeout', 'authService', function ($timeout, authService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        uid: '='
      },
      template: 
        '<img ng-src="{{avatarUrl}}" />',
      link: function (scope, element, attrs) {
        scope.avatarUrl = '';
        authService.getAvatar(scope.uid).then(function (avatarUrl) {
          if (avatarUrl) {
            $timeout(function () {
              scope.avatarUrl = avatarUrl;
            });
          }
        }).catch(function (err) {
          console.error(err);
        })
      }
    }
  }]);
})(angular);