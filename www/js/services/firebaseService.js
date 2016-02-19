(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray', '$location'];

  function firebaseData($firebaseArray, $location) {

    //put firebase at the top to be used in declarations area
    var ref = new Firebase("https://firechatmlatc.firebaseio.com/");
    var messages = ref.child("/messages");
    var rooms = ref.child("/rooms");
    var users = ref.child("/users");

    //Define all variables and functions usable to other controllers
    var fb = this;
    fb.rooms = $firebaseArray(rooms);
    fb.users = $firebaseArray(users);
    fb.addMessage = addMessage;
    fb.getCurrentMessages = getCurrentMessages;
    fb.addRoom = addRoom;
    fb.addUser = addUser;
    fb.login = login;
    fb.FBlogin = FBlogin;
    fb.Googlelogin = Googlelogin;
    fb.register = register;
    fb.logout = logout;

    function addMessage(message, room){
      var currentRoom = messages.child("/" + room);
      fb.newmessages = $firebaseArray(currentRoom);
      fb.newmessages.$add({
        content: message,
        timeStamp: new Date().getTime(),
        to: 'All',
        from: 'me'
      });
    }

    function addRoom(){
      //this function will allow a user to add a new room - might also allow user to PM another user
    }

    function addUser(){
      //function to add a user
    }

    function getCurrentMessages() {
      var temp = messages.child(activeChat());
      return $firebaseArray(temp);
    }

    //functions used only inside of the service go here
    function activeChat() {
      var completeURL = $location.url();
      var lastSlash = completeURL.lastIndexOf('/');
      return completeURL.substr(lastSlash);
    }

    //User authentication functions
    function login(email, password){
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithPassword({
        email: email,
        password : password
      }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
    }

    function FBlogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

    function Googlelogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);

        }
      })
    }

    function register(firstname, lastname, email, username, password){
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.createUser(
        {
          username: username,
          email: email,
          password: password,
          name: firstname + " " + lastname
        }, function(error, userData) {
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
      console.log("User was logged out! (I hope)");
    }

  }

}());
