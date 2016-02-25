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

  AccountController.$inject = ['$scope', 'firebaseData', '$timeout'];

  function AccountController($scope, firebaseData, $timeout) {

    var ac = this;

    load();
    ac.login = login;
    ac.FBlogin = FBlogin;
    ac.Googlelogin = Googlelogin;
    ac.register = register;
    ac.logout = logout;

    function load(){
      if (firebaseData.userData == {} || firebaseData.loggedInUser == '') {
        ac.state = "login";
        ac.loggedInUser = "";
        console.log("Not logged in :(")
      }
      else{
        ac.state = "loggedin";
        ac.loggedInUser = firebaseData.loggedInUser;
        console.log("Logged in as " + ac.loggedInUser);
      }
    }

    function login(email, password) {
      firebaseData.login(email, password).then(function(){
        ac.loggedInUser = firebaseData.loggedInUser;
        $timeout(function(){
          ac.state = "loggedin";
          //console.log(ac.state);
        });

      });
    }


    function FBlogin() {
      console.log('FB Login');
      firebaseData.FBlogin().then(function(){
        ac.loggedInUser = firebaseData.loggedInUser;
        $timeout(function(){
          ac.state = "loggedin";
          //console.log(ac.state);
        });
      });
    }

    function Googlelogin(){
      console.log('Google Login');
      firebaseData.Googlelogin().then(function(){
        ac.loggedInUser = firebaseData.loggedInUser;
        $timeout(function(){
          ac.state = "loggedin";
          //console.log(ac.state);
        });
      });
    }


    function register(firstname, lastname, email, username, password){
      firebaseData.register(firstname, lastname, email, username, password);
      ac.state = "loggedin";
      ac.loggedInUser = firebaseData.loggedInUser;
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
