(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .directive('node', [
    '$location', 
    '$routeParams', 
    'nodeService', 
    'firebaseService', 
    'authService', 
    'favService',
    'notificationService',
  
  function (
    $location, 
    $routeParams, 
    nodeService, 
    firebaseService, 
    authService,
    favService,
    notificationService) {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/nodes/views/node.html',
      scope: {
        node: '=',
        select: '=',
        pause: '='
      },
      link: function (scope, element, attrs) {
        
        var parentId;
        
        // Init
        
        function init() {
          
          parentId =  $routeParams.id;
          
          favService.isFavd(scope.node.$id).then(function (yeah) {
            scope.favd = yeah;
          }).catch(function (err) {
            console.error(err);
          });
        }
        
        init();
        
        // Scope
        
        scope.favd = false;
        scope.favCount = scope.node.favCount || 0;
        
        scope.fav = function () {
          
          scope.favd = !scope.favd;
          scope.favCount = (scope.favd) ? scope.favCount + 1 : scope.favCount -1; 
          
          // Update the favorites record (indicating you have favd/unfavd it)
          return favService.fav(scope.node.id, parentId, scope.node.$id, scope.favd, scope.favCount)
            .then(function () {
              if (scope.favd) {
                return notificationService.notify(
                  notificationService.TYPE.FAVORITE, 
                  scope.node.text, 
                  scope.node.id, 
                  '/n/' + scope.node.id, 
                  scope.favCount
                );
              }
            }).catch(function (err) {
              console.error(err);
            });
        };
        
        // Go to the user's profile page
        
        scope.goToProfile = function (uid) {
          $location.path('user/' + uid);
        };
      }
    }
  }]);
  
})(angular);