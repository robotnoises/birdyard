(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('breadcrumbService', function () {
    
    // Public
    
    var _breadcrumbService = {};
    
    // Takes an id onto a breadcrumb trail (Array)
    function _push(id, breadcrumb) {
      if (angular.isArray(breadcrumb) && id) {
        breadcrumb.push(id);
        return breadcrumb;
      } else if (id) {
        return [id];
      } else {
        throw new Error('You must provide a valid id.');
      }
    }
    
    _breadcrumbService.push = _push;
    
    return _breadcrumbService;
    
  });
  
})(angular);