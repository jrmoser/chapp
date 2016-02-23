(function () {
  'use strict';

  angular.module('AccountController', ['firebaseData'])
    .directive('validateEmail', function(){
    var EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, ctrl){
        // only apply the validator if ngModel is present AND Angular has added the email validator
        if (ctrl && ctrl.$validators.email){
          //overwrites the default Angular email validator
          ctrl.$validators.email = function(modelValue){
            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
          }
        }
      }
    };
  })
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope', 'firebaseData'];

  function AccountController($scope, firebaseData) {

    var ac = this;

    //This is used to toggle the UI. I should probably use Switch and States but I don't know how to use that yet.
    if (firebaseData.userData == {}) {
      ac.state = "login";
      ac.user = "";
    }
    else{
      ac.state = "loggedin";
      ac.user = firebaseData.userData.password;
      console.log("Logged in as " + ac.user);
    }
    ac.login = login;
    ac.FBlogin = FBlogin;
    ac.Googlelogin = Googlelogin;
    ac.register = register;
    ac.logout = logout;

    function login(email, password) {
      firebaseData.login(email, password);
      ac.state = "loggedin";
    }


    function FBlogin() {
      console.log('FB Login');
      firebaseData.FBlogin();
      ac.state = "loggedin";
    }

    function Googlelogin(){
      console.log('Google Login');
      firebaseData.Googlelogin();
      ac.state = "loggedin";
    }


    function register(firstname, lastname, email, username, password){
      firebaseData.register(firstname, lastname, email, username, password);
      ac.state = "loggedin";
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
