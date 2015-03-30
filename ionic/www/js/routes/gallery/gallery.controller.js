/**
 * Gallery controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc controller
     * @name GalleryCtrl
     * @module app.gallery
     * @requires images
     * @requires CameraService
     * @description
     * Controller for the gallery page.
     *
     * @ngInject
     */
    function GalleryCtrl(images, CameraService) {
        var vm = this;
        vm.images = images;
        vm.takePicture = CameraService.takePicture;
    }

    angular
        .module('app.gallery')
        .controller('GalleryCtrl', GalleryCtrl);
})();
