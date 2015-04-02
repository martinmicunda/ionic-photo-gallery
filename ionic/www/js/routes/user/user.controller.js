/**
 * User controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name UserCtrl
     * @module app.users
     * @requires $rootScope
     * @requires user
     * @description
     * Controller for the user page.
     *
     * @ngInject
     */
    function UserCtrl($rootScope, user) {
        var vm = this;
        vm.user = user;
        vm.title = $rootScope.me._id === user._id ? 'My Profile' : 'User';
    }

    angular
        .module('app.user')
        .controller('UserCtrl', UserCtrl);
})();
