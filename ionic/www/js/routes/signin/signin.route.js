/**
 * Signin route.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name signinRoute
     * @module app.signin
     * @requires $stateProvider
     * @description
     * Router for the signin page.
     *
     * @ngInject
     */
    function signinRoute($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'js/routes/signin/signin.html',
                controller: 'SigninCtrl as vm',
                data: {
                    authenticate: false
                }
            });
    }

    angular
        .module('app.signin')
        .config(signinRoute);

})();
