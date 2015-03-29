(function () {
    'use strict';

    /**
     * @ngInject
     */
    function CoreCtrl($state, Authentication) {
        var vm = this;

        vm.signOut = function() {
            Authentication.signout().then(function () {
                console.log('Succesful');
                $state.go('signin');
            }, function (err) {
                console.log('error ' + err);
                $state.go('signin');
            });
        };
        vm.isAuthenticated = function() {
            return Authentication.isAuthenticated();
        };

        vm.launchMartinMicundaPage = function(){
            window.open("http://martinmicunda.com", "_blank", "closebuttoncaption=Done,location=no");
        };
    }

    angular
        .module('app.core')
        .controller('CoreCtrl', CoreCtrl);
})();
