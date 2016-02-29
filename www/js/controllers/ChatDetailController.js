(function () {
  'use strict';

  angular.module('ChatDetailController', ['firebaseData'])

    .controller('ChatDetailController', ChatDetailController);

  ChatDetailController.$inject = ['firebaseData', '$ionicScrollDelegate'];

  function ChatDetailController(firebaseData, $ionicScrollDelegate) {

    var cdc = this;
    cdc.send = send;
    cdc.loggedIn = firebaseData.loggedInUser.username;
    cdc.messages = firebaseData.getCurrentMessages();
    cdc.room = firebaseData.getCurrentRoom();

    function send(message) {
      if (cdc.message === '') {
        return;
      }
      else {
        firebaseData.addMessage(message);
        cdc.message = '';
        $ionicScrollDelegate.scrollBottom(true);
      }
    }
  }

}());
