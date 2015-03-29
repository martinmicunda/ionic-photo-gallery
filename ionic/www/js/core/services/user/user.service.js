(function () {
    'use strict';

    /**
     * @ngInject
     */
    function UserService(Restangular) {
        return {
            get: function(id) {
                return Restangular
                    .one('users', id)
                    .get();
            },
            getList: function() {
                return Restangular
                    .all('users')
                    .getList();
            }
        };
    }

    angular
        .module('app.core')
        .factory('UserService', UserService);

})();
