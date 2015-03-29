(function () {
    'use strict';

    /**
     * @ngInject
     */
    function SigninCtrl($rootScope, $state, Authentication) {
        var vm = this;

        vm.signIn = function(credentials) {
            // save user profile details to $rootScope
            $rootScope.me = Authentication.currentUser;
            $rootScope.me.id = $rootScope.me._id;
            delete $rootScope.me._id;

            //$state.go('app.galleries');

            Authentication.signin(credentials).then(function () {
                $state.go('app.users');
            });
        };
    }

    angular
        .module('app.signin')
        .controller('SigninCtrl', SigninCtrl);
})();
