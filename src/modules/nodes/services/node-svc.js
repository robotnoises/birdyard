(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .factory('nodeService', ['firebaseService', '$firebaseObject', '$firebaseArray', '$window', 'authService', 
  
  function (firebaseService, $firebaseObject, $firebaseArray, $window, authService) {
    
    // Public
    
    var _nodeService = {};
    
    // Get a single node by its id
    function _getNodeById(id) {
      var $ref = firebaseService.getRef('nodes', id);
      return $firebaseObject($ref);
    }
    
    // Get a node via path
    function _getNodeByPath(path) {
      var $ref = firebaseService.getRef(path);
      return $firebaseObject($ref);
    }
    
    // Get a single node's children
    function _getChildNodes(id) {
      var $ref = firebaseService.getRef('nodes', id, 'children');
      return $firebaseArray($ref);
    }
    
    // Create a node    
    function _pushNode(data) {
      var $ref = firebaseService.getRef('nodes');
      var $newObj = $ref.push();
      
      // Set the id as the created firebase pushId
      data.id = $newObj.key();
      data.timestamp = $window.Firebase.ServerValue.TIMESTAMP;
      
      // Set the newly-create object to 
      $newObj.setWithPriority(data, data.timestamp);
      
      return $firebaseObject($newObj);
    }
    
    // Format a node object
    function _formatNode(text, origin) {
      
      return authService.getUser().then(function ($user) {
        
        var node = {
          id: '',
          origin: origin || '',
          text: text,
          uid: $user.uid,
          commentCount: 0,
          language: $user.language,
          handle: $user.handle,
          name: $user.name
        };
      
        return node;
      });
    }
    
    _nodeService.getById = _getNodeById;
    _nodeService.getByPath = _getNodeByPath;
    _nodeService.getChildren = _getChildNodes;
    _nodeService.push = _pushNode;
    _nodeService.format = _formatNode;
    
    return _nodeService;
    
  }]);
  
})(angular);