(function () {
    'use strict';

    /**
     * @ngInject
     */
    function loginRoutes($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',

                //abstract: true,
                controller: 'AuthenticationCtrl as vm',
                templateUrl: 'js/authentication/views/main.html',
                data: {
                    authenticate: false
                }
            })
            .state('signin', {
                url: '/signin',
                controller: 'AuthenticationCtrl as vm',
                templateUrl: 'js/authentication/views/signin.html',
                data: {
                    authenticate: false
                }

                //views: {
                //    'signin': {
                //        templateUrl: 'js/authentication/views/signin.html'
                //    }
                //}
            })
            .state('signup', {
                url: '/signup',
                controller: 'AuthenticationCtrl as vm',
                templateUrl: 'js/authentication/views/signup.html',
                data: {
                    authenticate: false
                }

                //views: {
                //    'signup': {
                //        templateUrl: 'js/authentication/views/signup.html'
                //    }
                //}
            });
    }

    angular
        .module('app.authentication')
        .config(loginRoutes);

})();
