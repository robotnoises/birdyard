(function (angular) {
  
  'use strict';
  
  angular.module('bbop.rooms')
  
  // Pun
  .factory('roomService', ['$q', '$window', 'firebaseService', '$firebaseArray', 'authService', 'scrollable',
  
  function ($q, $window, firebaseService, $firebaseArray, authService, scrollable) {
    
    // Private
    
    function save(data, location) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('rooms/' + location);
        var $room = $ref.push();
        data.id = $room.key();
        $room.setWithPriority(data, data.score);
        resolve($room);  
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
        return save(roomData, _getCategory(roomData.category)).then(function ($room) {
          roomData.categoryId = $room.key();
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
          timestamp: $window.Firebase.ServerValue.TIMESTAMP,
          name: $user.name
        };
        
        return room;
      });
    }
    
    function _getCategory(value) {
      
      var v = parseInt(value, 10);
      var category = '';
      
      switch(v) {
        case 0:
          category = 'everything';
          break;
        case 1:
          category = 'news';
          break;
        case 2:
          category = 'entertainment';
          break;
        case 3:
          category = 'sports';
          break;
        case 4:
          category = 'games';
          break;
        case 5:
          category = 'whatever';
          break;
        default:
          category = 'everything';
      }
      
      return category;
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