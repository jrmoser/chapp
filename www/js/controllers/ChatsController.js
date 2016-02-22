(function () {
  'use strict';

  angular.module('ChatsController', ['firebaseData'])

    .controller('ChatsController', ChatsController);

  ChatsController.$inject = ['$scope', 'Chats', 'firebaseData'];

  function ChatsController($scope, Chats, firebaseData) {

    var cc = this;
    cc.addRoom = addRoom;
    cc.chatRooms = firebaseData.rooms;

    function addRoom(name, desc){
      firebaseData.addRoom(name, desc);
      cc.desc = '';
      cc.name = '';
    }

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  }

}());
