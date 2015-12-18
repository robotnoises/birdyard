(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  // Pun
  .factory('roomService', ['$q', 'firebaseService', '$firebaseArray', 'authService', 'scrollable',
  
  function ($q, firebaseService, $firebaseArray, authService, scrollable) {
    
    // Private
    
    var _CATEGORY = Object.freeze({
      ALL: 0,
      NEWS: 1,
      ENTERTAINMENT: 2,
      SPORTS: 3,
      GAMES: 4,
      WHATEVER: 5
    });
    
    // Public
    
    var _roomService = {};
    
    function _getRooms(category) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('rooms');  
        resolve(scrollable($ref, 'score'));
      });
    }
    
    function _saveRoom(roomData) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('rooms');
        var $room = $ref.push();
        roomData.id = $room.key();
        $room.setWithPriority(roomData, roomData.category);
        resolve();
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
          category: 0,
          language: $user.language,
          handle: $user.handle,
          name: $user.name
        };
        
        return room;
      });
    }
    
    _roomService.CATEGORY = _CATEGORY;
    _roomService.getRooms = _getRooms;
    _roomService.format = _formatRoom;
    _roomService.saveRoom = _saveRoom;
    
    return _roomService;
    
  }]);
  
})(angular);