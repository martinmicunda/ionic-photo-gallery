/**
 * Signup controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name SignupCtrl
     * @module app.signup
     * @requires $rootScope
     * @requires $state
     * @requires Authentication
     * @description
     * Controller for the signup page.
     *
     * @ngInject
     */
    function SignupCtrl($rootScope, $state, Authentication) {
        var vm = this;

        vm.signUp = function(user) {
            Authentication.signup(user).then(function () {
                // save user profile details to $rootScope
                $rootScope.me = Authentication.currentUser;
                $rootScope.me.id = $rootScope.me._id;
                delete $rootScope.me._id;

                $state.go('app.gallery', { userId: $rootScope.me.id});
            }, function(err) {
                console.error('error' + err);
            });
        };
    }

    angular
        .module('app.signup')
        .controller('SignupCtrl', SignupCtrl);
})();
