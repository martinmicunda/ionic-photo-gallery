(function () {
    'use strict';

    /**
     * @ngInject
     */
    function SignupCtrl($state, Authentication) {
        var vm = this;

        vm.signUp = function(credentials) {
            $state.go('app.gallery');
            Authentication.signin(credentials).then(function () {
                var user = Authentication.currentUser;
                //var us = localStorageService.get('user');

//              LocalStorageService.setUser(user);
                console.log('Successful');
                $state.go('gallery');

            }, function(err) {
                console.error('error' + err);
            });
        };
    }

    angular
        .module('app.signup')
        .controller('SignupCtrl', SignupCtrl);
})();
