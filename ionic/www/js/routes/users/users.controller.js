(function () {
    'use strict';

    /**
     * @ngInject
     */
    function UsersCtrl(users) {
        var vm = this;
        vm.users = users;
    }

    angular
        .module('app.users')
        .controller('UsersCtrl', UsersCtrl);
})();
