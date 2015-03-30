/**
 * Users route.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name usersRoute
     * @module app.users
     * @requires $stateProvider
     * @description
     * Router for the users page.
     *
     * @ngInject
     */
    function usersRoute($stateProvider) {
        $stateProvider
            .state('app.users', {
                url: '/users',
                views: {
                    'menuContent': {
                        templateUrl: 'js/routes/users/users.html',
                        controller: 'UsersCtrl as vm'
                    }
                },
                resolve: {/* @ngInject */
                    users: function(UserService){
                        return UserService.getList();
                    }
                },
                data: {
                    authenticate: true
                }
            });
    }

    angular
        .module('app.users')
        .config(usersRoute);

})();
