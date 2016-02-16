(function () {
  'use strict';

  angular.module('AccountController', [])

    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope'];

  function AccountController($scope) {

    $scope.settings = {
      enableFriends: true
    };

  }

}());
