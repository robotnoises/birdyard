(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .directive('node', [
    '$location', 
    '$routeParams', 
    'nodeService', 
    'firebaseService', 
    'authService',
  
  function (
    $location, 
    $routeParams, 
    nodeService, 
    firebaseService, 
    authService) {
    
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
        
        // Todo: fav service
        
        var parentId;
        
        // Init
        
        function init() {
          
          parentId =  $routeParams.id;
          
          authService.getUser().then(function (user) {
            var $favRef = firebaseService.getRef('favorites', user.uid, scope.node.$id);
            $favRef.once('value', function ($snap) {
              var favd = $snap.val();
              if (favd) {
                scope.favd = favd;
              }
            });
          });
        }
        
        init();
        
        // Scope
        
        scope.favd = false;
        scope.favCount = scope.node.favCount || 0;
        
        scope.fav = function () {
          
          scope.favd = !scope.favd;
          
          if (scope.favd) {
            scope.favCount = scope.favCount + 1;
          } else {
            scope.favCount = scope.favCount - 1;
          }
          
          // Update the favorites record (indicating you have favd it)
          authService.getUser()
            .then(function (user) {
              var $favRef = firebaseService.getRef('favorites', user.uid, scope.node.$id);
              $favRef.set(scope.favd);
            }).catch(function (err) {
              console.error(err);
            });  
          
          // Update the node favCount
          nodeService.update({id: scope.node.id, favCount: scope.favCount})
            .then(function() {
              // Todo: this is clunky
              var location = 'nodes/' + parentId + '/children/' + scope.node.$id;
              // Update the child
              return nodeService.update({favCount: scope.favCount}, location)
            }).catch(function(err) {
              console.error(err);
            });
        };
        
        scope.goToProfile = function (uid) {
          $location.path('user/' + uid);
        };
      }
    }
  }]);
  
})(angular);