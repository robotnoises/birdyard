(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.rooms')
  
  .controller('newroomController', [
    '$q',
    '$scope', 
    '$timeout',
    '$location',
    'uiService', 
    'roomService', 
    'nodeService', 
    'breadcrumbService', 
    '$mdToast',
    'meta',
  
  function (
    $q,
    $scope, 
    $timeout,
    $location,
    uiService, 
    roomService, 
    nodeService, 
    breadcrumbService, 
    $mdToast,
    meta) {
    
    var titlePlaceholderValid =   'Give your room a title';
    var textPlaceholderValid =    'Write an initial comment';
    var titlePlaceholderInvalid = 'C\'mon, you really need to give your room a title!';
    var textPlaceholderInvalid =  'You have to say something here.';
    
    // Scope
    
    $scope.room =           {};
    $scope.loaded =         false;
    $scope.categoryChosen = false;
    
    $scope.titleValid =     true;
    $scope.categoryValid =  true;
    $scope.textValid =      true;
    
    $scope.titlePlaceholder = titlePlaceholderValid;
    $scope.textPlaceholder = textPlaceholderValid;
    
    // Private
    
    function init() {
      $timeout(function () {
        meta.setTitle('Make a new Room');
        $scope.loaded = true;
      });
    }
    
    function validateFields() {
      $scope.titleValid =     !!$scope.room.title;
      $scope.categoryValid =  !!$scope.room.category;
      $scope.textValid =      !!$scope.room.text;
    }
    
    // Needs to have a Title, a Category, and some introductory comment
    function validateForm() {
      return $q(function (resolve, reject) {
        if (!$scope.room.title || !$scope.room.category || !$scope.room.text) {
          
          validateFields();
          
          var message = 'Please fill-out the entire form.';
          reject({valid: false, message: message});
        } else {
          resolve();
        }
      });
    }
    
    init();
    
    // Watchers
    
    $scope.$watch('titleValid', function (valid, oldValue) {
      if (valid) {
        $scope.titlePlaceholder = titlePlaceholderValid;
      } else {
        $scope.titlePlaceholder = titlePlaceholderInvalid;
      }
      
      if (valid !== oldValue) {
        validateFields();  
      }
    });
    
    $scope.$watch('textValid', function (valid, oldValue) {
      if (valid) {
        $scope.textPlaceholder = textPlaceholderValid;
      } else {
        $scope.textPlaceholder = textPlaceholderInvalid;
      }
      
      if (valid !== oldValue) {
        validateFields();  
      }
    });
    
    // Public
    
    $scope.newRoom = function () {
      validateForm().then(function () {
        return nodeService.format($scope.room.text);
      }).then(function (formatted) {
        return nodeService.push(formatted);
      }).then(function ($node) {
        $node.breadcrumb = breadcrumbService.push($node.$id);
        return $node.$save();
      }).then(function ($node) {
        return roomService.format($scope.room, $node.key());
      }).then(function(formatted) {
        return roomService.saveRoom(formatted);
      }).then(function () {
        
        // Display success message
        $mdToast.show(
          $mdToast.simple()
            .content('New room created!')
            .theme('toast-success')
            .position('bottom right')
            .hideDelay(3000)
          );
        
        // Goto category list
        var category = roomService.getCategory($scope.room.category);
        $location.path('/rooms/c/' + category);
        
      }).catch(function(err) {
        
        var msg = 'Something went wrong, please try again.';
                
        if (err.code && err.code.indexOf('PERMISSION_DENIED') > -1) {
          msg = 'Slow down. You\'re doing that too much.';
        } else if (!err.validForm) {
          msg = err.message;
        }
        
        // Display error message
        $mdToast.show(
          $mdToast.simple()
            .content(msg)
            .theme('toast-error')
            .position('bottom right')
            .hideDelay(3000)
          );
      });
    };
    
    $scope.chooseCategory = function (_category) {
      $scope.room.category = _category;
      $scope.categoryChosen = true;
      validateFields();
    };
    
  }]);
  
})(angular);