(function () {
    'use strict';

    /**
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
