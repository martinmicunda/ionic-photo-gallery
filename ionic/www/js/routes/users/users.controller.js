/**
 * Users controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name UsersCtrl
     * @module app.users
     * @requires users
     * @description
     * Controller for the users page.
     *
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
