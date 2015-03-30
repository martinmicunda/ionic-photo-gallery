/**
 * User route.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name userRoute
     * @module app.users
     * @requires $stateProvider
     * @description
     * Router for the user page.
     *
     * @ngInject
     */
    function userRoute($stateProvider) {
        $stateProvider
            .state('app.user', {
                url: '/users/:userId',
                views: {
                    'menuContent': {
                        templateUrl: 'js/routes/user/user.html',
                        controller: 'UserCtrl as vm'
                    }
                },
                resolve: {/* @ngInject */
                    user: function(UserService, $stateParams){
                        var userId = $stateParams.userId;
                        return UserService.get(userId);
                    }
                },
                data: {
                    authenticate: true
                }
            });
    }

    angular
        .module('app.user')
        .config(userRoute);

})();
