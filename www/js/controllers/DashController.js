(function () {
  'use strict';

  angular.module('DashController', [])

    .controller('DashController', DashController);

  DashController.$inject = ['firebaseData'];

  function DashController(firebaseData) {
    var dc = this;
    dc.messages = firebaseData.data;
  }

}());
