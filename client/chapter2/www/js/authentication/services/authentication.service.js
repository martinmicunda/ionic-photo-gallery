(function () {
    'use strict';

    /**
     * @ngInject
     */
    function AuthenticationProvider() {
        this.$get = function($http, Restangular, Token, localStorageService) {
            //var currentUser = localStorageService.get('user');
            var currentUser = null;

            return {
                signup: function(params) {
                    return Restangular
                        .all('auth/signup')
                        .post(params)
                        .then(function(response){
                            // store token to local storage
                            Token.set(response.token);
                            // decode user data from payload token
                            currentUser = Token.decodeToken(response.token);

                            //localStorageService.set('user', currentUser);
                        });
                },
                signin: function(params) {
                    return Restangular
                        .all('auth/signin')
                        .post(params)
                        .then(function(response){
                            // store token to local storage
                            Token.set(response.token);
                            // decode user data from payload token
                            currentUser = Token.decodeToken(response.token);

                            //localStorageService.set('user', currentUser);
                        });
                },
                signout: function() {
                    return Restangular
                        .one('auth/signout')
                        .get()
                        .then(function(){
                            Token.remove();
                        });
                },
                isAuthenticated: function() {
                    return !!Token.get();
                },
                currentUser: currentUser
            };
        };
    }

    angular
        .module('app.authentication')
        .provider('Authentication', AuthenticationProvider);
})();
