(function () {
    'use strict';

    /**
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
