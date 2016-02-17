(function () {
  'use strict';

  angular.module('firebaseData', [
      'firebase'
    ])

    .service('firebaseData', firebaseData);

  firebaseData.$inject = ['$firebaseArray'];

  function firebaseData($firebaseArray) {

    var ref = new Firebase("https://firechatmlatc.firebaseio.com/");
    return $firebaseArray(ref);

  }

}());
