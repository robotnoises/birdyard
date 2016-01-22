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
  
]).run(['backdropService', function (backdropService) {
  
  // Set-up global backdrop service, used in tandem with the click-anywhere directive (both in utilities)  
  backdropService.reset();

}]);