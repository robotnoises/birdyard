'use strict'

describe('bbop.utilities', function () {
  
  beforeEach(function () {
    module('bbop');
    module('bbop.utilities');
  });
    
  describe('Breadcrumb service', function () {
    
    var _service;
    var _fakeId = 'cccccccc';
    var _fakeBreadcrumb = ['aaaaaaaa', 'bbbbbbbb'];

    beforeEach(function () {
      inject(function(breadcrumbService) {
        _service = breadcrumbService;
      }); 
    });
    
    it('should be defined.', function() {
      expect(_service.push).toBeDefined();               
    });
    
    it('should return an Array.', function () {
      var bc = _service.push(_fakeId, _fakeBreadcrumb);
      var result = Array.isArray(bc);
      expect(result).toBeTruthy();
    });
    
    it('should return an Array if the id is a string and there is no breachcrumb', function () {
      var bc = _service.push(_fakeId);
      var result = Array.isArray(bc) && bc.length === 1;
      expect(result).toBeTruthy();
    });
    
    // Errors
    
    it('should throw an error if id is an empty string.', function() {
      var fn = function () {
        _service.push('', _fakeBreadcrumb);
      }
      expect(fn).toThrow();
    });
    
    it('should throw an error if breadcrumb is not an Array.', function() {
      var fn = function () {
        _service.push(_fakeId, {hello: 'world'});
      }
      expect(fn).toThrow();
    });
    
    it('should throw an error if push is called without params.', function() {
      var fn = function () {
        _service.push();
      }
      expect(fn).toThrow();
    });
    
  });
});