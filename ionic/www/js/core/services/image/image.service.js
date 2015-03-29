(function () {
    'use strict';

    /**
     * @ngInject
     */
    function ImageService(Restangular) {
        return {
            get: function(id) {
                return Restangular
                    .one('images', id)
                    .get();
            },
            //getList: function() {
            //    return Restangular
            //        .all('images')
            //        .getList();
            //},
            getByUser: function(userId) {
                return Restangular
                    .all('images')
                    .getList({userId: userId});
            }
        };
    }

    angular
        .module('app.core')
        .factory('ImageService', ImageService);

})();
