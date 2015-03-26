(function () {
    'use strict';

    /**
     * @ngInject
     */
    function usersListRoute($stateProvider) {
        $stateProvider
            .state('app.users-list', {
                url: '/users',
                views: {
                    'menuContent': {
                        controller: 'UsersListCtrl as vm',
                        templateUrl: 'js/users/list/users.list.html'
                    }
                },
                data: {
                    authenticate: true
                }
            });
    }

    angular
        .module('app.users.list')
        .config(usersListRoute);

})();
