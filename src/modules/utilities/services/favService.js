(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .factory('favService', [
    '$q',
    'authService', 
    'firebaseService', 
    'nodeService',
    'notificationService',
    
  function(
    $q, 
    authService, 
    firebaseService, 
    nodeService,
    notificationService) {
    
    var _favService = {};
    
    function _isFavd(id) {
      return $q(function (resolve, reject) {
        return authService.getUser()
          .then(function (user) {
            if (!user) {
              resolve();
            } else {
              var $favRef = firebaseService.getRef('favorites', user.uid, id);
              $favRef.once('value', function ($snap) {
                var favd = $snap.val();
                  resolve(favd || false);
                });
              }  
            });
      });
    }
    
    function _fav(nodeId, parentId, childId, favd, favCount) {
      return authService.getUser()
        .then(function (user) {
          // Todo: node Id as well
          var $ref = firebaseService.getRef('favorites', user.uid, childId);
          return $ref.set(favd);
      }).then(function() {
        return nodeService.update({id: nodeId, favCount: favCount});  
      }).then(function() {
          // Todo: this is clunky
          var location = 'nodes/' + parentId + '/children/' + childId;
          // Update the child
          return nodeService.update({favCount: favCount}, location);
        });
    }
    
    _favService.isFavd = _isFavd;
    _favService.fav = _fav;
    
    return _favService;
  }]);
  
})(angular);

