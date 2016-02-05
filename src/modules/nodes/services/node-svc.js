(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .factory('nodeService', ['$q', 'firebaseService', '$firebaseObject', '$firebaseArray', '$window', 'authService', 'activityService',
  
  function ($q, firebaseService, $firebaseObject, $firebaseArray, $window, authService, activityService) {
    
    // Private
    
    var _$activity = null;
    
    function _getActivity() {
      return activityService.get().then(function ($activity) {
        return $activity;
      }).catch(function (err) {
        console.log(err);
      });
    }
    
    function init() {
      _getActivity().then(function ($activity) {
        _$activity = $activity;
      });
    }
    
    function _format(text, origin) {

      return authService.getUser().then(function ($user) {
        
        var node = {
          id: '',
          origin: origin || '',
          text: text,
          uid: $user.uid,
          commentCount: 0,
          favCount: 0,
          language: $user.language,
          description: $user.description,
          name: $user.name,
          accent: $user.accent,
          lastActivity: _$activity.lastActivity || $user.activity.lastActivity
        };
        
        _$activity.lastActivity = $window.Firebase.ServerValue.TIMESTAMP;
        _$activity.$save();
      
        return node;
      });
    }
    
    init();
    
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
      
      return $q(function (resolve, reject) {
        
        var $ref = firebaseService.getRef('nodes');
        var $newObj = $ref.push();
      
        // Set the id as the created firebase pushId
        data.id = $newObj.key();
        data.timestamp = $window.Firebase.ServerValue.TIMESTAMP;
      
        // Set the newly-create object to 
        $newObj.setWithPriority(data, data.timestamp);
        
        resolve($firebaseObject($newObj));
      });
    }
    
    function _updateNode(data, loc) {
      
      return $q(function (resolve, reject) {
        
        var location = loc || 'nodes/' + data.id;
        var $ref = firebaseService.getRef(location);
        
        return $ref.update(data, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
    
    // Format a node object
    function _formatNode(text, origin) {
      
      // If the user just auth'ed
      if (!_$activity) {
        return _getActivity().then(function ($activity) {
          _$activity = $activity;
          return _format(text, origin)
        });
      } else {
        return _format(text, origin);
      }
    }
    
    _nodeService.getById = _getNodeById;
    _nodeService.getByPath = _getNodeByPath;
    _nodeService.getChildren = _getChildNodes;
    _nodeService.push = _pushNode;
    _nodeService.update = _updateNode;
    _nodeService.format = _formatNode;
    
    return _nodeService;
    
  }]);
  
})(angular);