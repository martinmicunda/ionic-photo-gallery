(function () {
    'use strict';

    /**
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
