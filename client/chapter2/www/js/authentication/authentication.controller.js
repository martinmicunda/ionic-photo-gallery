(function () {
    'use strict';

    /**
     * @ngInject
     */
    function AuthenticationCtrl($state, $scope, Authentication, localStorageService) {
        var vm = this;
        vm.submitted = false;
        vm.user = localStorageService.get('user');
        vm.copyrightDate = new Date();
        if(vm.user) {
            $scope.credentials = { email: vm.user.email, password: ''};
        }
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

        vm.signOut = function() {
            Authentication.signout().then(function () {
                console.log('Succesful');
                $state.go('authentication.signIn');
            }, function (err) {
                console.log('error ' + err);
            });
        };
        vm.isAuthenticated = function() {
            return Authentication.isAuthenticated();
        };

        vm.launchMartinMicundaPage = function(){
            window.open("http://martinmicunda.com", "_blank", "closebuttoncaption=Done,location=no");
        }
    }

    angular
        .module('app.authentication')
        .controller('AuthenticationCtrl', AuthenticationCtrl);
})();
