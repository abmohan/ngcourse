'use strict';

angular.module('ngcourse.main-ctrl', [
  'ngcourse.users',
  'koast'
])

.controller('MainCtrl', function ($log, $state, koast, users) {
  var vm = this;
  vm.user = koast.user;

  koast.user.whenAuthenticated()
    .then(function() {
      return users.whenReady()
    })
    .then(function() {
      vm.userDisplayName = users.getUserDisplayName(koast.user.data.username);
      $state.go('tasks');
    })
    .then(null, $log.error);

  vm.login = function (username, password) {
    koast.user.loginLocal({ username: username, password: password })
      .then(function(){
        $state.go('tasks');
      })
      .then(null, showLoginError);
  };
  vm.logout = function () {
    koast.user.logout()
      .then(null, $log.error);
  };

  function showLoginError(errorMessage) {
    vm.errorMessage = 'Login failed.';
    $log.error(errorMessage);
  }
});
