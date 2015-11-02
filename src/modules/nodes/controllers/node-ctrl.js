(function (angular) {
  
  'use strict';
  
  angular.module('bebop.nodes')
  
  .controller('nodeController', ['$scope', 'nodeService', function ($scope, nodeService) {
    
    $scope.text = '';
    
    $scope.createNew = function() {
      var formatted = nodeService.format($scope.text);
      nodeService.push(formatted);
    };
    
  }]);
  
})(angular);