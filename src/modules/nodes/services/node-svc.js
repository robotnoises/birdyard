(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .factory('nodeService', ['firebaseService', '$firebaseObject', '$firebaseArray', '$window', 
  
  function (firebaseService, $firebaseObject, $firebaseArray, $window) {
    
    // Public
    
    var _nodeService = {};
    
    function _getNode(id) {
      var $ref = firebaseService.getRef('nodes', id);
      return $firebaseObject($ref);
    }
    
    function _pushNode(data) {
      var $ref = firebaseService.getRef('nodes');
      var $newObj = $ref.push();
      
      // Set the id as the created firebase pushId
      data.id = $newObj.key();
      data.timestamp = $window.Firebase.ServerValue.TIMESTAMP;
      
      // Set the newly-create object to 
      $newObj.set(data);
      
      return $firebaseObject($newObj);
    }
    
    function _formatNode(text, origin) {
      var node = {
        id: '',
        origin: '',
        text: text,
        owner: 'fooBar',  // User service?
        children: []      // Empty firebaseArray?
      };
      
      return node;
    }
    
    _nodeService.get = _getNode;
    _nodeService.push = _pushNode;
    _nodeService.format = _formatNode;
    
    return _nodeService;
    
  }]);
  
})(angular);