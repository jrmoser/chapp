(function () {
  'use strict';

  angular.module('AccountController', ['firebaseData'])
    .directive('validateEmail', function () {
      var EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
          // only apply the validator if ngModel is present AND Angular has added the email validator
          if (ctrl && ctrl.$validators.email) {
            //overwrites the default Angular email validator
            ctrl.$validators.email = function (modelValue) {
              return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
            }
          }
        }
      };
    })
    .controller('AccountController', AccountController);

  AccountController.$inject = ['$scope', 'firebaseData', '$timeout', '$q'];

  function AccountController($scope, firebaseData, $timeout, $q) {

    var ac = this;

    load();
    ac.login = login;
    ac.FBlogin = FBlogin;
    ac.Googlelogin = Googlelogin;
    ac.register = register;
    ac.logout = logout;
    ac.loginError = false;

    function load() {
      if (firebaseData.loggedInUser.username == '') {
        ac.state = "login";
        ac.username = "";
        console.log("Not logged in :(");
      }
      else {
        console.log("Already logged in :)");
        ac.state = "loggedin";
        ac.username = firebaseData.loggedInUser.username;
        console.log("Logged in as " + ac.username);
      }
    }

    function login(email, password) {
      firebaseData.login(email, password)
        .then(function () {
          if () {
            ac.username = firebaseData.loggedInUser.username;
            $timeout(function () {
              ac.state = "loggedin";
            });
          }
          else {
                  
          }
        });

    }


    function FBlogin() {
      console.log('FB Login');
      firebaseData.FBlogin().then(function () {
        ac.username = firebaseData.loggedInUser.username;
        $timeout(function () {
          ac.state = "loggedin";
        });
      });
    }

    function Googlelogin() {
      console.log('Google Login');
      firebaseData.Googlelogin().then(function () {
        ac.username = firebaseData.loggedInUser.username;
        $timeout(function () {
          ac.state = "loggedin";
        });
      });
    }


    function register(firstname, lastname, email, username, password) {
      firebaseData.register(firstname, lastname, email, username, password);
      ac.state = "loggedin";
      ac.loggedInUser = firebaseData.loggedInUser;
    }

    function logout() {
      firebaseData.logout();
      ac.state = "login";
      ac.username = "";
    }


    ac.togglereg = function () {
      if (ac.state == "login") {
        ac.state = "reg";
      }
      else {
        ac.state = "login";
      }
    };
  }

}());
