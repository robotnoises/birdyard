(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  // Pun
  .factory('roomService', ['$q', 'firebaseService', '$firebaseArray', 'authService', 'scrollable',
  
  function ($q, firebaseService, $firebaseArray, authService, scrollable) {
    
    // Private
    
    function save(data, location) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('rooms/' + location);
        var $room = $ref.push();
        data.id = $room.key();
        $room.setWithPriority(data, data.score);
        resolve();  
      });
    }
    
    // Public
    
    var _roomService = {};
    
    function _getRooms(category) {
      return $q(function (resolve, reject) {
        var c = category || 'everything';
        var $ref = firebaseService.getRef('rooms', c);  
        resolve(scrollable($ref, 'score'));
      });
    }
    
    function _saveRoom(roomData) {
      return $q(function (resolve, reject) {
        return save(roomData, _getCategory(roomData.category)).then(function () {
          return save(roomData, 'everything');
        }).then(function () {
          resolve();
        });
      });
    }
    
    function _formatRoom(roomData, nodeId) {
      return authService.getUser().then(function ($user) {
        
        var room = {
          id: '',
          title: roomData.title,
          uid: $user.uid,
          nodeId: nodeId,
          score: 0,
          category: 1, // todo: user needs to supply this
          name: $user.name
        };
        
        return room;
      });
    }
    
    function _getCategory(value) {
      var v = parseInt(value, 10);
      switch(v) {
        case 0:
          return 'everything';
          break;
        case 1:
          return 'news';
          break;
        case 2:
          return 'entertainment';
          break;
        case 3:
          return 'sports';
          break;
        case 4:
          return 'games';
          break;
        case 5:
          return 'whatever';
          break;
        default:
          return 'everything';
      }
    }
    
    function _getCategoryValue(category) {
      switch(category) {
        case 'everything':
          return 0;
          break;
        case 'news':
          return 1;
          break;
        case 'entertainment':
          return 2;
          break;
        case 'sports':
          return 3;
          break;
        case 'games':
          return 4;
          break;
        case 'whatever':
          return 5;
          break;
        default:
          return 0;
      }
    }
    
    _roomService.getRooms = _getRooms;
    _roomService.format = _formatRoom;
    _roomService.saveRoom = _saveRoom;
    _roomService.getCategory = _getCategory;
    _roomService.getCategoryValue = _getCategoryValue;
    
    return _roomService;
    
  }]);
  
})(angular);