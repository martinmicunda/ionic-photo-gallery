(function () {
    'use strict';

    /**
     * @ngInject
     */
    function UsersListCtrl() {
        var vm = this;
        vm.users = [];
    }

    angular
        .module('app.users.list')
        .controller('UsersListCtrl', UsersListCtrl);
})();
