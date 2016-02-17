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
      console.log(email);
      console.log(username);
      console.log(password);
    };

    $scope.reg = false;

    $scope.togglereg = function(){
      if (!$scope.reg) {
        $scope.reg = true;
      }
      else {
        $scope.reg = false;
      }
    };

    var ref = new Firebase("https://firechatmlatc.firebaseio.com");
    ref.createUser({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });

  }

}());
