(function (angular) {
  
  'use strict';
  
  angular.module('bbop.users')
  
  .directive('avatar', ['authService', function (authService) {
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
          scope.avatarUrl = avatarUrl;
        }).catch(function (err) {
          console.error(err);
        })
      }
    }
  }]);
})(angular);