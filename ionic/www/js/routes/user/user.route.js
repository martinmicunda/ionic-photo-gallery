(function () {
    'use strict';

    /**
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
