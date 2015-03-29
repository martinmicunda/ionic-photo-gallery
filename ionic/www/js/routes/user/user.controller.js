(function () {
    'use strict';

    /**
     * @ngInject
     */
    function UserCtrl(user) {
        var vm = this;
        vm.user = user;
    }

    angular
        .module('app.user')
        .controller('UserCtrl', UserCtrl);
})();
