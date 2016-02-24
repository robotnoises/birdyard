(function (angular) {
  
  'use strict';
  
  angular.module('birdyard.nodes')
  
  .directive('node', [
    '$q',
    '$window',
    '$rootScope',
    '$location', 
    '$routeParams', 
    'nodeService', 
    'firebaseService', 
    'authService', 
    'favService',
    'stashService',
    'notificationService',
    '$mdDialog',
    '$mdToast',
    'DOMAIN',
  
  function (
    $q,
    $window,
    $rootScope,
    $location, 
    $routeParams, 
    nodeService, 
    firebaseService, 
    authService,
    favService,
    stashService,
    notificationService,
    $mdDialog,
    $mdToast,
    DOMAIN) {
    
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'modules/nodes/views/node.html',
      scope: {
        node: '=',
        select: '=',
        pause: '='
      },
      link: function (scope, element, attrs) {
        
        var parentId;
        
        // Init
        
        function init() {
          
          parentId =  $routeParams.id;
          
          favService.isFavd(scope.node.$id).then(function (yeah) {
            scope.favd = yeah;
          }).catch(function (err) {
            console.error(err);
          });
        }
        
        function report() {
          
          var $flaggedRef = firebaseService.getRef('flagged', scope.node.id);
          var $reportersRef = $flaggedRef.child('reporters');
          
          return $q(function (resolve, reject) {
            $flaggedRef.once('child_added', function ($snap) {
              var $count = $flaggedRef.child('count');
              var children = $snap.val();
              $count.set(Object.keys(children).length);
            });
                
            return authService.getUser().then(function (user) {
              var $userRef = $reportersRef.child(user.uid);
              $userRef.set(true);
              resolve();
            });  
          });
        };
        
        init();
        
        // Scope
        
        scope.favd = false;
        scope.favCount = scope.node.favCount || 0;
        scope.linkToNode = DOMAIN + 'n/' + scope.node.id; // Todo: let's be smarter with this
        
        scope.fav = function () {
          
          if (!$rootScope.signedIn) {
            return;
          }
          
          scope.favd = !scope.favd;
          scope.favCount = (scope.favd) ? scope.favCount + 1 : scope.favCount -1; 
          
          // Update the favorites record (indicating you have favd/unfavd it)
          return favService.fav(scope.node.id, parentId, scope.node.$id, scope.favd, scope.favCount)
            .then(function () {
              if (scope.favCount > 0) {
                return notificationService.notify(
                  notificationService.TYPE.FAVORITE, 
                  scope.node.text, 
                  scope.node.uid,
                  scope.node.id,
                  '/n/' + scope.node.id, 
                  scope.favCount
                );
              } else {
                notificationService.read(scope.node.id);
              }
            }).catch(function (err) {
              console.error(err);
            });
        };
        
        scope.replyTo = function (node) {
          stashService.set('replyNow', true);
          scope.select(node);
        }
        
        scope.confirmReport = function ($event) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Are you sure you want to report this?')
            .content(
              'By clicking REPORT, you are stating that you find this comment offensive, ' + 
              'and/or inappropriate. Our moderators review all reported content and will ' + 
              'take actions if deemed necessary.'
            )
            .ariaLabel('Report ' + scope.node.name)
            .targetEvent($event)
            .clickOutsideToClose(true)
            .escapeToClose(true)
            .ok('REPORT')
            .cancel('CANCEL');
          
          $mdDialog.show(confirm).then(report).then(function () {
            // Display success message
            $mdToast.show(
              $mdToast.simple()
                .content('Reported.')
                .theme('toast-default')
                .position('bottom right')
                .hideDelay(3000)
              );
          });
        };
        
        // Go to the user's profile page
        
        scope.goToProfile = function (uid) {
          if ($rootScope.signedIn) {
            $location.path('user/' + uid);  
          }
        };
        
        // When the user successfully copies a link to their clipboard
        scope.clipboardSuccess = function (e) {
          $mdToast.show(
            $mdToast.simple()
              .content('Copied!')
              .theme('toast-success')
              .position('bottom right')
              .hideDelay(3000)
            );
        };
      }
    }
  }]);
  
})(angular);