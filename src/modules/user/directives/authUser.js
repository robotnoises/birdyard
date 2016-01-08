(function (angular) {
  
  'use strict';
  
  angular.module('bbop.users')
  
  .directive('authUser', ['$location', 'firebaseService', 'authService', 'uiService', function ($location, firebaseService, authService, uiService) {
    return {
      restrict: 'E',
      replace: true,
      template: 
        '<div class="quick-auth content">' +
          '<h2>Whoa there, partner!</h2>' +
          '<p>You need to be signed-in to do that.</p>' +
          '<p>Click the icon below to sign-in with Twitter:</p>' +
          '<i class="icon fa-twitter-square pointer" ng-click="signIn(\'twitter\')"></i>' +
        '</div>',
      link: function (scope, element, attrs) {
                
        // Public
        
        scope.signIn = function (provider) {
    
          var $ref = firebaseService.getRef();
    
          $ref.authWithOAuthPopup(provider, function(error, authData) { 
            if (error) {
              console.error(error);
            } else {
              authService.signIn(authData).then(function () {
                angular.element(document.getElementById('text-input')).focus();
              }).catch(function (error) {
                console.error(error);
              });
            }
          });
        };
      }
    }
  }]);
})(angular);