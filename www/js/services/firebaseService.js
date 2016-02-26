(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase',
    'ngStorage'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray', '$location', '$firebaseObject', '$localStorage', '$http'];

  function firebaseData($firebaseArray, $location, $firebaseObject, $localStorage, $http) {

    //put firebase at the top to be used in declarations area
    var ref = new Firebase("https://firechatmlatc.firebaseio.com/");
    var messages = ref.child("/messages");
    var rooms = ref.child("/rooms");
    var users = ref.child("/users");

    //Define all variables and functions usable to other controllers
    var fb = this;
    fb.objectRef = $firebaseObject(ref);
    fb.rooms = $firebaseArray(rooms);
    fb.loggedInUser = {name: '', username: '', uid: '', email: ''};
    fb.addMessage = addMessage;
    fb.getCurrentMessages = getCurrentMessages;
    fb.getCurrentRoom = getCurrentRoom;
    fb.addRoom = addRoom;
    fb.login = login;
    fb.FBlogin = FBlogin;
    fb.Googlelogin = Googlelogin;
    fb.register = register;
    fb.logout = logout;
    fb.loadUser = loadUser;
    fb.getGeneralChat = getGeneralChat;
    loadUser();

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
      //Authenticates user by email and password
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      return ref.authWithPassword({
        email: email,
        password: password
      }, function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          fb.loggedInUser.email = authData.password.email;
          fb.loggedInUser.uid = authData.uid;
          console.log("Authenticated successfully with payload:", authData);
          $http.get("https://firechatmlatc.firebaseio.com/users/" + authData.uid + ".json")   //this makes an HTTP request to GET the name and username values stored in the database
            .then(function(response){
            fb.loggedInUser.name = response.data.name;
            fb.loggedInUser.username = response.data.username;
            saveUser(fb.loggedInUser);
            console.log("Logged in as " + fb.loggedInUser.username);
          })
        }
      });
    }

    function FBlogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      return ref.authWithOAuthPopup("facebook", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          fb.loggedInUser = authData.facebook.displayName;
          console.log("Authenticated successfully with payload:", authData);
          saveUser(authData, fb.loggedInUser);
          }
      });
    }

    function Googlelogin() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      return ref.authWithOAuthPopup("google", function (error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          fb.loggedInUser = authData.google.displayName;
          console.log("Authenticated successfully with payload:", authData);
          saveUser(authData, fb.loggedInUser);
        }
      });
    }

    function register(firstname, lastname, email, username, password) {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com/users");
      ref.createUser(
        {
          email: email,
          password: password

        }, function (error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            var ref = new Firebase("https://firechatmlatc.firebaseio.com/users/" + userData.uid);
            ref.set({username: username, name: firstname + " " + lastname});
            login(email, password);
          }
        });
    }

    function logout() {
      var ref = new Firebase("https://firechatmlatc.firebaseio.com");
      ref.unauth();
      fb.loggedInUser = {name: '', username: '', uid: '', email: ''};
      delete $localStorage.loggedInUser;
      console.log("User was logged out!");
    }

    function saveUser(userdata) {
      $localStorage.loggedInUser = userdata;
      console.log("User information saved. " + userdata);
    }

    function loadUser() {
      if ($localStorage.loggedInUser) {
        fb.loggedInUser = $localStorage.loggedInUser;
        console.log("User information loaded. " + fb.loggedInUser);
      }
    }

  }

}());
