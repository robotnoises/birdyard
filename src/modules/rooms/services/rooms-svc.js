(function (angular) {
  
  'use strict';
  
  angular.module('bebop.rooms')
  
  // Pun
  .factory('roomService', ['$q', 'firebaseService', '$firebaseArray', 
  
  function ($q, firebaseService, $firebaseArray) {
    
    // Private
    
    var _CATEGORY = Object.freeze({
      ALL: 0,
      NEWS: 1,
      SPORTS: 2,
      ENTERTAINMENT: 3,
      GAMES: 4
    });
    
    // Public
    
    var _roomService = {};
    
    function _getRooms(category) {
      return $q(function (resolve, reject) {
        var _category = category || '';
        var $ref = firebaseService.getRef('rooms').startAt(_category).endAt(_category);
        resolve($firebaseArray($ref));
      });
    }
    
    function _newRoom(roomData) {
      return $q(function (resolve, reject) {
        var $ref = firebaseService.getRef('rooms');
        var $room = $ref.push();
        $room.setWithPriority(roomData, roomData.category);
        resolve();
      });
    }
    
    _roomService.CATEGORY = _CATEGORY;
    _roomService.getRooms = _getRooms;
    
    return _roomService;
    
  }]);
  
})(angular);