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
     * @requires $scope
     * @requires $stateParams
     * @requires images
     * @requires CameraService
     * @requires ImageService
     * @requires $ionicLoading
     * @description
     * Controller for the gallery page.
     *
     * @ngInject
     */
    function GalleryCtrl($rootScope, $scope, $stateParams, images, CameraService, ImageService, $ionicLoading) {
        var vm = this;
        vm.listCanSwipe = true;
        vm.images = images;
        vm.title = $rootScope.me._id === $stateParams.userId ? 'My Gallery' : 'Gallery';
        vm.isCameraAvailable = $rootScope.me._id === $stateParams.userId;
        vm.takePhoto = function() {
            CameraService.takePicture().then(function() {
                ImageService.getByUser($stateParams.userId).then(function(images) {
                    vm.images = images;
                }, function(error) {
                    console.error('Can not load images '+ error);
                }).then(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
            });
        };
        vm.delete = function(image) {
            $ionicLoading.show({template: 'Deleting...'});
            ImageService.delete(image._id).then(function(){
                vm.images.splice(vm.images.indexOf(image), 1);
            }, function(error) {
                console.error('Can not delete image '+ error);
            }).then(function() {
                $ionicLoading.hide();
            });
        };
        vm.doRefresh = function() {
            ImageService.getByUser($stateParams.userId).then(function(images) {
                vm.images = images;
            }, function(error) {
                console.error('Can not load images '+ error);
            }).then(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });

        }
    }

    angular
        .module('app.gallery')
        .controller('GalleryCtrl', GalleryCtrl);
})();
