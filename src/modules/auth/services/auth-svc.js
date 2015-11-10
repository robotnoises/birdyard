(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .factory('authService', ['$timeout', 'firebaseService', function ($timeout, firebaseService) {
    
    // Public
    
    var _authService = {};
    
    function _getUser() {
      
    }
    
    _authService.getUser = _getUser;
    
    return _authService;
  }]);
  
})(angular);