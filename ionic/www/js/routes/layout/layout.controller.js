/**
 * Layout controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name LayoutCtrl
     * @module app.gallery
     * @requires $state
     * @requires Authentication
     * @description
     * Controller for the layout page.
     *
     * @ngInject
     */
    function LayoutCtrl($state, Authentication) {
        var vm = this;

        vm.signOut = function() {
            Authentication.signout().then(function () {
                $state.go('signin');
            }, function (err) {
                console.log('error ' + err);
                $state.go('signin');
            });
        };

        vm.launchMartinMicundaPage = function(){
            window.open("http://martinmicunda.com", "_blank", "closebuttoncaption=Done,location=no");
        };
    }

    angular
        .module('app.layout')
        .controller('LayoutCtrl', LayoutCtrl);
})();
