(function () {
  'use strict';

  angular.module('AccountController', [])

    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope'];

  function AccountController($scope) {

    //These are used to toggle the UI. I should probably use Switch and States but I don't know how to use that yet.
    $scope.state = "login";

    $scope.login = function login(email, password){
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithPassword({
        email: email,
        password : password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.state = "loggedin";
          $scope.$apply();
          }

      });
      //Troubleshooting console logs
      //console.log('The user was logged in! Not really. This function does nothing. :(');
      //console.log(username);
      //console.log(password);
    };

    $scope.loginFB = function() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.state = "loggedin";
          $scope.$apply();
        }
      });
    };

    $scope.loginGoogle = function() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.state = "loggedin";
          $scope.$apply();
        }
      });
    };

    $scope.register = function register(firstname, lastname, email, username, password){
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.createUser(
        {
          username: username,
          email: email,
          password: password,
          name: firstname + " " + lastname
        },
        function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          //$scope.loggedin = true;
          $scope.login(email, password);
        }
      });
      //Troubleshooting console logs
      //console.log('The user should have been created');
      //console.log("Name: " + firstname + " " + lastname);
      //console.log("Email: " + email);
      //console.log("Username: " + username);
      //console.log("Password: " + password);
    };

    $scope.togglereg = function(){
      if ($scope.state == "login"){
        $scope.state = "reg";
      }
      else {
        $scope.state = "login";
      }
    };

    $scope.logout = function() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.unauth();
      console.log("User was logged out! (I hope)");
      $scope.state = "login";


    }

  }

}());
