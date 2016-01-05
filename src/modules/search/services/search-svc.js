(function (angular) {
  
  'use strict';
  
  // Todo: move to config
  var ELASTIC_INDEX = 'bbop';
    
  angular.module('bbop.search')
    
  .factory('searchService', ['$q', 'firebaseService', 
  
  function ($q, firebaseService) {
    
    var _searchService = {};
    
    function _search(query, type) {  
      return $q(function (resolve, reject) {
        if (!query) {
          resolve();
        } else {
          var $ref = firebaseService.getRef('search');
          var $key = $ref.child('request').push({ index: ELASTIC_INDEX, type: type, query: query }).key();
          var $response = $ref.child('response/'+ $key);
          
          $response.on('value', function ($snap) {
            var $results = $snap.val();
            if ($results) {
              resolve($results);
            }
          });
        }
     });
    }
    
    _searchService.search = _search;
    
    return _searchService;
    
  }]);
  
})(angular);