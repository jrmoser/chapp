(function () {
  'use strict';

  angular.module('ChatDetailController', ['firebaseData'])

    .controller('ChatDetailController', ChatDetailController);

  ChatDetailController.$inject = [
    '$scope',
    '$stateParams',
    'Chats',
    'firebaseData',
    '$location'
  ];

  function ChatDetailController($scope,
                                $stateParams,
                                Chats,
                                firebaseData
                                ) {

    var cdc = this;
    cdc.send = send;
    cdc.messages = firebaseData.getCurrentMessages();

    $scope.chat = Chats.get($stateParams.chatId);

    function send(message, room) {
      firebaseData.addMessage(message, room);
      cdc.message = '';
    }

  }

}());
