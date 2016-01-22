(function (angular) {
  
  'use strict';
  
  // Note: this service is global
  
  angular.module('birdyard')
  
  .factory('backdropService', ['$rootScope', function ($rootScope) {
    
    // Public
    
    var _backdropService = {};
    
    function _reset() {
      $rootScope.backdropActive = false;
      $rootScope.backdropZIndex = 1;
      $rootScope.backdropClick = function () {
        console.warn('Birdyard Warning: You have not assigned a callback to handle the click-anywhere \'click\' event');
        return;
      }
    }
    
    function _set (activate, zIndex, handler) {
      $rootScope.backdropActive = activate;
      $rootScope.backdropZIndex = zIndex;
      $rootScope.backdropClick = handler;
    }
    
    _backdropService.reset =  _reset;
    _backdropService.set =    _set;
    
    return _backdropService;
    
  }]);
  
})(angular);