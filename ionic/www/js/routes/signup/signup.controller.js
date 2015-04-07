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
    function SignupCtrl($location, $rootScope, $state, Authentication) {
        var vm = this;
        vm.user = {};
        vm.signUp = function(user, isValid) {
            if(!isValid) {return;}
            Authentication.signup(user).then(function () {
                // save user profile details to $rootScope
                $rootScope.me = Authentication.getCurrentUser();

                $state.go('app.gallery', { userId: $rootScope.me._id});
            }, function(err) {
                console.error('error' + err);
            });
        };

        vm.goHome = function() {
            $location.path('/');
        };

        vm.goToSignin = function(){
            $state.go('signin');
        };
    }

    angular
        .module('app.signup')
        .controller('SignupCtrl', SignupCtrl);
})();
