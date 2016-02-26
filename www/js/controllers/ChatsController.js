(function () {
  'use strict';

  angular.module('ChatsController', ['firebaseData'])

    .controller('ChatsController', ChatsController);

  //Turning Text into Hyperlink in the Chats
  app.filter('parseUrl', function() {
    var  //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim,
    //Change email addresses to mailto:: links.
      replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

    return function(text, target, otherProp) {
      angular.forEach(text.match(replacePattern1), function(url) {
        text = text.replace(replacePattern1, "<a href=\"$1\" target=\"_blank\">$1</a>");
      });
      angular.forEach(text.match(replacePattern2), function(url) {
        text = text.replace(replacePattern2, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
      });
      angular.forEach(text.match(replacePattern3), function(url) {
        text = text.replace(replacePattern3, "<a href=\"mailto:$1\">$1</a>");
      });

      return text;
    };
  });

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
