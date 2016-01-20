(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .directive('node', ['$timeout', '$location', '$routeParams', 'nodeService', 
  
  function ($timeout, $location, $routeParams, nodeService) {
    
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
        
        var parentId = $routeParams.id;
        
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

          // Update the node
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