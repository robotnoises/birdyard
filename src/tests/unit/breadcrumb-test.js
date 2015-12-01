'use strict'

describe('bebop.utilities', function () {
  
  beforeEach(function () {
    module('bebop');
    module('bebop.utilities');
  });
    
  describe('Breadcrumb service', function () {
    
    var _service;
    
    beforeEach(function () {
      inject(function(breadcrumbService) {
        _service = breadcrumbService;
      }); 
    });
    
    it('should be defined.', function() {
      expect(_service.push).toBeDefined();               
    });
    
  });
});