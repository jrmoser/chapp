(function () {
  'use strict';

  angular.module('AccountController', [])

    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope'];

  function AccountController($scope) {

    $scope.login = function login(username, password){
      console.log('The user was logged in! Not really. This function does nothing. :(')
      console.log(username);
      console.log(password);
    };

    $scope.register = function register(firstname, lastname, email, username, password){
      console.log('The user was registered! Not really. This function does nothing. :(');
      console.log(firstname);
      console.log(lastname);
      console.log(email)
      console.log(username);
      console.log(password);
    };

  }

}());
