/**
 * Gallery route.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc object
     * @name galleryRoute
     * @module app.gallery
     * @requires $stateProvider
     * @description
     * Router for the gallery page.
     *
     * @ngInject
     */
    function galleryRoute($stateProvider) {
        $stateProvider
            .state('app.gallery', {
                url: '/galleries/:userId',
                views: {
                    'menuContent': {
                        templateUrl: 'js/routes/gallery/gallery.html',
                        controller: 'GalleryCtrl as vm'
                    }
                },
                resolve: {/* @ngInject */
                    images: function(ImageService, $stateParams){
                        var userId = $stateParams.userId;
                        return ImageService.getByUser(userId);
                    }
                },
                data: {
                    authenticate: true
                }
            });
    }

    angular
        .module('app.gallery')
        .config(galleryRoute);

})();
