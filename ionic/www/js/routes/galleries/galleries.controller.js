/**
 * Galleries controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name GalleriesCtrl
     * @module app.galleries
     * @description
     * Controller for the galleries page.
     *
     * @ngInject
     */
    function GalleriesCtrl(users) {
        var vm = this;
        vm.users = users;

    }

    angular
        .module('app.galleries')
        .controller('GalleriesCtrl', GalleriesCtrl);
})();
