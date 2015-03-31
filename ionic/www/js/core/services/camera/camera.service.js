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
     * @requires $cordovaFileTransfer
     * @requires $cordovaCamera
     * @requires SERVER_API_URL
     * @description
     * Service to take picture via camera phone and upload photo to server.
     *
     * @ngInject
     */
    function CameraService($rootScope, $cordovaFileTransfer, $cordovaCamera, SERVER_API_URL) {
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

        //var _cameraOptions = null;
        /**
         * @ngdoc method
         * @name CameraService#clearCache
         * @description Clear camera cache (only required for FILE_URI).
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
            var imageURI = 'img/ionic.png';
            var fileTransferOptions = {
                fileKey: 'image',
                fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
                mimeType: 'image/jpeg',
                chunkedMode: false,
                params: { // Whatever you populate options.params with, will be available in req.body at the server-side.
                    userId: $rootScope.me._id
                }
            };

            function uploadImage(imageURI) {
                console.log('Image has been taken ' + imageURI);
                $cordovaFileTransfer.upload(SERVER_API_URL + '/images', imageURI, fileTransferOptions)
                    .then(function(result) {
                        console.log('Image has been uploaded successfully: ' + JSON.stringify(result.response));
                        clearCache();
                    }, function(err) {
                        console.error('Image has not been uploaded successfully: ' + JSON.stringify(err));
                        clearCache();
                    });
            }

            return $cordovaCamera.getPicture(_cameraOptions).then(uploadImage(imageURI), function(error) {
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
