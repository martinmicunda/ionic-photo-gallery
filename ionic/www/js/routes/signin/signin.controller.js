/**
 * Signin controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name SigninCtrl
     * @module app.signin
     * @requires $rootScope
     * @requires $state
     * @requires Authentication
     * @requires $cordovaVibration
     * @description
     * Controller for the signin page.
     *
     * @ngInject
     */
    function SigninCtrl($rootScope, $state, Authentication, $cordovaVibration) {
        var vm = this;

        vm.signIn = function(credentials) {
            Authentication.signin(credentials).then(function () {
                // save user profile details to $rootScope
                $rootScope.me = Authentication.currentUser;

                $state.go('app.gallery', { userId: $rootScope.me._id});
            }, function(error) {
                // Vibrate 100ms
                $cordovaVibration.vibrate(100);
                console.log('error ' + error);
            });
        };
    }

    angular
        .module('app.signin')
        .controller('SigninCtrl', SigninCtrl);
})();
