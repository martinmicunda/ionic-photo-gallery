/**
 * Image service.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name ImageService
     * @module app.core
     * @requires Restangular
     * @description
     * Service to get the image data.
     *
     * @ngInject
     */
    function ImageService(Restangular) {
        return {
            /**
             * @ngdoc method
             * @name ImageService:get
             * @description
             * Retrieve image by id.
             *
             * @returns {promise} A promise which is resolved in image data.
             */
            get: function(id) {
                return Restangular
                    .one('images', id)
                    .get();
            },
            /**
             * @ngdoc method
             * @name ImageService:getByUser
             * @description
             * Retrieve all images that belong to user.
             *
             * @returns {promise} A promise which is resolved in image list data.
             */
            getByUser: function(userId) {
                return Restangular
                    .all('images')
                    .getList({userId: userId});
            },
            /**
             * @ngdoc method
             * @name ImageService:delete
             * @description
             * Delete image by id.
             *
             * @returns {promise} A promise which is resolved in image list data.
             */
            delete: function(id) {
                return Restangular
                    .one('images', id)
                    .remove();
            }
        };
    }

    angular
        .module('app.core')
        .factory('ImageService', ImageService);

})();
