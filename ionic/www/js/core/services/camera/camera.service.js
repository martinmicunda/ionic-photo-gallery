/**
 * Camera service.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name CameraService
     * @module app.core
     * @requires $rootScope
     * @requires $timeout
     * @requires $cordovaFileTransfer
     * @requires $cordovaCamera
     * @description
     * Service to take picture via camera phone and upload photo to server.
     *
     * @ngInject
     */
    function CameraService($rootScope, $timeout, $cordovaFileTransfer, $cordovaCamera) {
        /**
         * @type {object}
         * @private
         */
        var _cameraOptions = {
            quality : 75,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
        };
        /**
         * @ngdoc method
         * @name CameraService#clearCache
         * @description Clear camera cache.
         * @private
         */
        var clearCache = function() {
            $cordovaCamera.cleanup().then(function () {
                console.log('Camera cleanup success.');
            }, function(error) {
                console.error('Failed because: ' + error);
            });
        };

        var takePicture = function() {

            //var onFail = function (message) {
            //    alert('Failed because: ' + message);
            //};
            var onSuccess = function() {

            };

            var serverURL = 'http://192.168.0.100:3000';
            var imageURI = 'img/ionic.png';

            var fileTransferOptions = {
                fileKey: 'image',
                fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
                mimeType: 'image/jpeg',
                chunkedMode: false,
                params: { // Whatever you populate options.params with, will be available in req.body at the server-side.
                    userId: $rootScope.me.id
                }
            };

            function upload(imageURI) {
                $cordovaFileTransfer.upload(serverURL + '/images', imageURI, fileTransferOptions)
                    .then(function(result) {
                        console.log("SUCCESS: " + JSON.stringify(result.response));
                        clearCache();
                    }, function(err) {
                        console.log("ERROR: " + JSON.stringify(err));
                        clearCache();
                    }, function (progress) {
                        $timeout(function () {
                            //vm.downloadProgress = (progress.loaded / progress.total) * 100;
                        })
                    });
            }

            $cordovaCamera.getPicture(_cameraOptions).then(function(imageURI) {
                console.log("Image has been uploaded " + imageURI);
                upload(imageURI);
            }, function(error) {
                console.error(error);
            });


        };

        return {
            takePicture: takePicture
        }
    }

    angular
        .module('app.core')
        .factory('CameraService', CameraService);

})();
