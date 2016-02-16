(function () {
  'use strict';

  angular.module('ChatDetailController', [])

    .controller('ChatDetailController', ChatDetailController);

  ChatDetailController.$inject = ['$scope', '$stateParams', 'Chats'];

  function ChatDetailController($scope, $stateParams, Chats) {

    $scope.chat = Chats.get($stateParams.chatId);

  }

}());
