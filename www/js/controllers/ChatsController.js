(function () {
  'use strict';

  angular.module('ChatsController', ['firebaseData'])

    .controller('ChatsController', ChatsController);

  ChatsController.$inject = ['$scope', '$ionicPopup', 'firebaseData'];

  function ChatsController($scope, $ionicPopup, firebaseData) {

    var cc = this;
    cc.addRoom = addRoom;
    cc.addRoomPopup = addRoomPopup;
    cc.loggedIn = firebaseData.loggedInUser.username;
    cc.chatRooms = firebaseData.rooms;

    function addRoom(name, desc) {
      firebaseData.addRoom(name, desc);
      cc.desc = '';
      cc.name = '';
    }

    function addRoomPopup() {
      $ionicPopup.prompt({
        title: 'Add a room that doesn\'t already exist',
        templateUrl: 'add-chat-room.html',
        //didn't want to, but this requires that I have the $scope used to make this work properly
        scope: $scope,
        buttons: [
          {
            text: 'Cancel',
            type: 'button-default'
          },
          {
            text: 'Add',
            type: 'button-balanced',
            onTap: function () {
              cc.addRoom(cc.name, cc.desc);
            }
          }]
      });
    }
  }


}());
