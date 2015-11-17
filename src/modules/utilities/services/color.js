(function (angular) {
  
  'use strict';
  
  angular.module('bebop.utilities')
  
  .factory('colorService', function () {
    
    // Public
    
    var _colorService = {};
    
    var _colorList = [
      '#1abc9c', // 'Turquoise'
      '#2ecc71', // 'Emerald'
      '#27ae60', // 'Pine'
      '#3498db', // 'Cerulean
      '#2980b9', // 'Colbalt' 
      '#2c3e50', // 'Midnight' 
      '#9b59b6', // 'Violet'
      '#8e44ad', // 'Plum'
      '#c0392b', // 'Cherry'
      '#e74c3c', // 'Rose'
      '#d35400', // 'Umber' 
      '#e67e22', // 'Carrot' 
      '#f39c12', // 'Citrus' 
      '#f1c40f'  // 'Sunflower' 
    ];
    
    function _getRandom() {
      var random = Math.floor(Math.random() * (_colorList.length - 1) - 0) + 0;
      return _colorList[random];
    }
    
    _colorService.list = _colorList;
    _colorService.random = _getRandom;
    
    return _colorService;
    
  });
  
})(angular);