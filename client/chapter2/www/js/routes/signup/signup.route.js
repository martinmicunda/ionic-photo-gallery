(function () {
    'use strict';

    /**
     * @ngInject
     */
    function signupRoute($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                controller: 'SignupCtrl as vm',
                templateUrl: 'js/states/signup/signup.html',
                data: {
                    authenticate: false
                }
            });
    }

    angular
        .module('app.signup')
        .config(signupRoute);

})();
