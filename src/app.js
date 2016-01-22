'use strict';

angular.module('birdyard', [
  
  // birdyard!
  'birdyard.config',
  'birdyard.users',
  'birdyard.search',
  'birdyard.utilities',
  'birdyard.nodes',
  'birdyard.rooms',
  'birdyard.notifications',
  
  // Third-party
  'ngMaterial',
  'btford.markdown'
  
]).run(['$rootScope', function ($rootScope) {
  // This is the default page title
  $rootScope.pageTitle = 'Talk about everything';
}]);