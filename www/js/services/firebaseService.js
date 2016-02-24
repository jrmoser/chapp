(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase',
    'ngStorage'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray', '$location', '$firebaseObject', '$localStorage'];

  function firebaseData($firebaseArray, $location, $firebaseObject, $localStorage) {

    //put firebase at the top to be used in declarations area
    var ref = new Firebase("https://firechatmlatc.firebaseio.com/");
    var messages = ref.child("/messages");
    var rooms = ref.child("/rooms");
    var users = ref.child("/users");

    //Define all variables and functions usable to other controllers
    var fb = this;
    fb.objectRef = $firebaseObject(ref);
    fb.rooms = $firebaseArray(rooms);
    fb.loggedInUser = '';
    fb.userData = {};
    fb.addMessage = addMessage;
    fb.getCurrentMessages = getCurrentMessages;
    fb.getCurrentRoom = getCurrentRoom;
    fb.addRoom = addRoom;
    fb.login = login;
    fb.FBlogin = FBlogin;
    fb.Googlelogin = Googlelogin;
    fb.register = register;
    fb.logout = logout;
    fb.getGeneralChat = getGeneralChat;


    function addMessage(message) {
      var currentRoomMessages = getCurrentMessages();
      currentRoomMessages.$add({
        content: message,
        timeStamp: new Date().getTime(),
        from: fb.loggedInUser
      });
    }

    function addRoom(name, desc) {
      fb.objectRef.rooms[name] = {
        name: name,
        desc: desc,
        face: 'img/octopusInTophat.jpg'
      };
      fb.objectRef.$save();
    }

    function getCurrentMessages() {
      var temp = messages.child(activeRoom());
      return $firebaseArray(temp);
    }

    function getCurrentRoom() {
      var temp = rooms.child(activeRoom());
      return $firebaseObject(temp);
    }

    //functions used only inside of the service go here

    function activeRoom() {
      var completeURL = $location.url();
      var lastSlash = completeURL.lastIndexOf('/');
      return completeURL.substr(lastSlash);
    }

    function getGeneralChat(){
      var temp = messages.child("/General%20Chat");
      return $firebaseArray(temp);
    }
    //User authentication functions
    function login(email, password) {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithPassword({
        email: email,
        password: password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          //fb.userData = authData;
          saveUser(authData);
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

    function FBlogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          fb.loggedInUser = authData.facebook.displayName;
        }
      });
    }

    function Googlelogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("google", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          fb.loggedInUser = authData.google.displayName;
        }
      });
    }

    function register(firstname, lastname, email, username, password) {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.createUser(
        {
          username: username,
          email: email,
          password: password,
          name: firstname + " " + lastname
        }, function (error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            login(email, password);
          }
        });
    }

    function logout() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.unauth();
      console.log("User was logged out!");
      delete $localStorage.user;
    }

    function saveUser(data) {
      $localStorage.user = data;
    }

    function loadUser() {
      fb.userData = $localStorage.user;
    }

  }

}());
