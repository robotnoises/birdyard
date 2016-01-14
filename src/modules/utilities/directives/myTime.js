(function (angular, moment) {
  
  'use strict';
  
  angular.module('birdyard.utilities')
  
  .directive('myTime', function () {
    return {
      restrict: 'A',
      replace: false,
      template: '<span>{{date}}</span>',
      link: function (scope, element, attrs) {
        var utc = parseInt(attrs['myTime'], 10);
        var date = moment(utc).local();
        var fromNow = attrs['fromNow'] === 'true';
        
        scope.date = (fromNow) ? date.fromNow() : date.format('MMM D') + ' at ' + date.format('h:mm a');
      }
    }
  });
  
})(angular, moment);