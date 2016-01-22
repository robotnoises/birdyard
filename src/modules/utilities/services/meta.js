(function (angular) {
  
  'use strict';
  
  // Note: this service is global
  
  angular.module('birdyard')
  
  .factory('meta', ['$rootScope', function($rootScope) {
    
    var _defaultTitle = 'Talk about everything';
    
    $rootScope.pageTitle = _defaultTitle;
    
    // Public
    
    var _meta = {};
        
    function _setTitle(title) {
      $rootScope.pageTitle = title || _defaultTitle;
    }
    
    _meta.setTitle = _setTitle;
    
    return _meta;
    
  }]);
  
})(angular);

