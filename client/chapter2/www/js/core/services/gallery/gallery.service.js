(function () {
    'use strict';

    /**
     * @ngInject
     */
    function GalleryService(Restangular) {
        return {
            get: function(id) {
                return Restangular
                    .one('galleries', id)
                    .get();
            },
            getList: function() {
                return this.Restangular
                    .all('galleries')
                    .getList();
            },
            getByUser: function(userId) {
                return this.Restangular
                    .all('galleries')
                    .getList();
            }
        };
    }

    angular
        .module('app.core')
        .factory('GalleryService', GalleryService);

})();
