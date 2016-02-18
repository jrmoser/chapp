(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray', '$firebaseObject', '$location'];

  function firebaseData($firebaseArray, $firebaseObject, $location) {

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

  }

}());
