(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray'];

  function firebaseData($firebaseArray) {

    var ref = new Firebase("https://popping-heat-2104.firebaseio.com/chatroom/");
    return $firebaseArray(ref);

  }

}());
