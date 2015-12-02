'use strict'

describe('bebop.users', function () {

  var _$rootScope;
  var _service;
    
  function init() {
    MockFirebase.override();
    module('bebop');
    module('bebop.users');
  }
  
  function inject() {
    return angular.mock.inject(function($rootScope, authService) {
      _$rootScope = $rootScope;
      _service = authService;
    });    
  }
  
  beforeEach(init);
  beforeEach(inject);
    
  describe('Auth service', function () {
    
    var _fakeUser = {
      uid: 'abc123',        
      expires: 99999999999999,
      provider: 'twitter',
      twitter: {
        cachedUserProfile: {
          lang: 'en'
        },
        username: 'twitter_guy',
        displayName: 'Twitter Guy',
        profileImageURL: 'http://cdn.junk.com/avatar.png'
      }
    };
                
    // Signin
    
    it('should return $firebaseAuth instance', function () {
      inject(function ($Auth, $firebaseAuth) {
        var $ref = new MockFirebase();
        var $auth = $firebaseAuth($ref); 
        expect($Auth.prototype === $auth.prototype).toBeTruthy();
      });
    });
    
    it('should define signIn method.', function () {
      expect(_service.signIn).toBeDefined();
    });
  });
});