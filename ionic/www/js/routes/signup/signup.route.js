/**
 * Signup route.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name signupRoute
     * @module app.signup
     * @requires $stateProvider
     * @description
     * Router for the signup page.
     *
     * @ngInject
     */
    function signupRoute($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'js/routes/signup/signup.html',
                controller: 'SignupCtrl as vm',
                data: {
                    authenticate: false
                }
            });
    }

    angular
        .module('app.signup')
        .config(signupRoute);

})();
