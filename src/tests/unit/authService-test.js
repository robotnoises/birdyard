'use strict'

describe('bebop.users', function () {
  
  beforeEach(function () {
    module('bebop');
    module('bebop.users');
  });
    
  describe('Auth service', function () {
    
    var _service;

    beforeEach(function () {
      inject(function(authService) {
        _service = authService;
      }); 
    });
    
    // Signin
    
    it('should return $firebaseAuth instance', function () {
      inject(function ($Auth, $firebaseAuth) {
        var $ref = new MockFirebase();
        var $auth = $firebaseAuth($ref); 
        expect($Auth.prototype === $auth.prototype).toBeTruthy();
      });
    });
    
  });
});