(function () {
  'use strict';

  angular.module('ChatDetailController', ['firebaseData'])

    .controller('ChatDetailController', ChatDetailController);

  ChatDetailController.$inject = ['firebaseData'];

  function ChatDetailController(firebaseData) {

    var cdc = this;
    cdc.send = send;
    cdc.messages = firebaseData.getCurrentMessages();
    cdc.room = firebaseData.getCurrentRoom();

    function send(message) {
      firebaseData.addMessage(message);
      cdc.message = '';
    }

  }

}());
