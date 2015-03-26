(function () {
    'use strict';

    /**
     * @ngInject
     */
    function SigninCtrl($state, Authentication, localStorageService) {
        var vm = this;

        vm.signIn = function(credentials) {
            $state.go('app.gallery');
//            Authentication.signin(credentials).then(function () {
//                var user = Authentication.currentUser;
//                //var us = localStorageService.get('user');
//
////              LocalStorageService.setUser(user);
//                console.log('Successful');
//                $state.go('gallery');
//
//            }, function(err) {
//                console.error('error' + err);
//            });
        };
    }

    angular
        .module('app.signin')
        .controller('SigninCtrl', SigninCtrl);
})();
