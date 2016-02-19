(function () {
  'use strict';

  angular.module('AccountController', ['firebaseData'])

    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope', 'firebaseData'];

  function AccountController($scope, firebaseData) {

    var ac = this;

    //This is used to toggle the UI. I should probably use Switch and States but I don't know how to use that yet.
    ac.state = "login";

    ac.login = login;
    ac.FBlogin = FBlogin;
    ac.Googlelogin = Googlelogin;
    ac.register = register;
    ac.logout = logout;

    function login() {
      firebaseData.login();
      ac.state = "loggedin";
      ac.$apply();
    }


    function FBlogin() {
      firebaseData.FBlogin();
      ac.state = "loggedin";
      ac.$apply();
    }

    function Googlelogin(){
      firebaseData.Googlelogin();
      ac.state = "loggedin";
      ac.$apply();
    }


    function register(){
      firebaseData.register();
      ac.state = "loggedin";
      ac.$apply();
    }

    function logout(){
      firebaseData.logout();
      ac.state = "login";
    }


    ac.togglereg = function(){
      if (ac.state == "login"){
        ac.state = "reg";
      }
      else {
        ac.state = "login";
      }
    };
  }

}());
