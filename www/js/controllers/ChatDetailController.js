(function () {
  'use strict';

  angular.module('ChatDetailController', [])

    .controller('ChatDetailController', ChatDetailController);

  ChatDetailController.$inject = ['$scope', '$stateParams', 'Chats', 'firebaseData'];

  function ChatDetailController($scope, $stateParams, Chats, firebaseData) {

    var cdc = this;
    cdc.messages = firebaseData;
    cdc.send = send;

    $scope.chat = Chats.get($stateParams.chatId);

    function send(message) {
      cdc.messages.$add({
        message: message,
        timeStamp: new Date().getTime()
      });

    }

  }

}());
