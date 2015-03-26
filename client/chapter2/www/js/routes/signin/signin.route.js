(function () {
    'use strict';

    /**
     * @ngInject
     */
    function signinRoute($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                controller: 'SigninCtrl as vm',
                templateUrl: 'js/states/signin/signin.html',
                data: {
                    authenticate: false
                }
            });
    }

    angular
        .module('app.signin')
        .config(signinRoute);

})();
