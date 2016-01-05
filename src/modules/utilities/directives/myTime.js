(function (angular, moment) {
  
  'use strict';
  
  angular.module('bbop.utilities')
  
  .directive('myTime', function () {
    return {
      restrict: 'A',
      replace: false,
      template: '<span class="strong">{{date}}</span>',
      link: function (scope, element, attrs) {
        var utc = parseInt(attrs['myTime'], 10);
        var date = moment(utc).local();
        scope.date = date.format('MMM D') + ' at ' + date.format('h:mm a');
      }
    }
  });
  
})(angular, moment);