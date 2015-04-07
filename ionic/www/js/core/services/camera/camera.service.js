/**
 * Camera service that takes and uploads image to server.
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
     * @requires $q
     * @requires $rootScope
     * @requires $cordovaFileTransfer
     * @requires $cordovaCamera
     * @requires $ionicLoading
     * @requires Token
     * @requires SERVER_API_URL
     * @description
     * Service to take picture via camera phone and upload photo to server.
     *
     * @ngInject
     */
    function CameraService($q, $rootScope, $cordovaFileTransfer, $cordovaCamera, $ionicLoading, Token, SERVER_API_URL) {
        /**
         * @type {object}
         * @private
         */
        var _cameraOptions = null;
        // catch error when we are testing on desktop as Camera is not available on desktop
        try {
            _cameraOptions = {
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 100,
                targetHeight: 100,
                saveToPhotoAlbum: false
            };
        } catch(err) {
            console.error('CameraService: ' + err);
        }

        /**
         * @type {object}
         * @private
         */
        var fileTransferOptions = {
            fileKey: 'image',
            fileName: 'img/ionic.png',
            mimeType: 'image/png',
            chunkedMode: false,
            params: { // these options.params, will be available in req.body at the server-side
                userId: $rootScope.me._id,
                url: SERVER_API_URL
            },
            headers: {
                Authorization: 'Bearer ' + Token.get()
            }
        };

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
                console.error('Camera cleanup failed because: ' + error);
            });
        };

        /**
         * @ngdoc method
         * @name CameraService#takePicture
         * @description Take and upload picture to server.
         */
        var takePicture = function() {
            var q = $q.defer();

            function onSuccess(imageURI) {
                $ionicLoading.show({template: 'Uploading...'});

                // upload image to server
                $cordovaFileTransfer.upload(SERVER_API_URL + '/images', imageURI, fileTransferOptions)
                    .then(function() {
                        console.log('Image has been uploaded successfully: ' + fileTransferOptions.fileName);
                        q.resolve();
                    }, function(error) {
                        console.error('Image has not been uploaded successfully: ' + JSON.stringify(error));
                        q.reject(error);
                    }).then(function() {
                        $ionicLoading.hide();
                        clearCache();
                    });
            }

            function onFailure(error) {
                console.error(error);
                q.reject(error);
            }

            $cordovaCamera.getPicture(_cameraOptions).then(onSuccess, onFailure);

            return q.promise;
        };

        return {
            takePicture: takePicture
        }
    }

    angular
        .module('app.core')
        .factory('CameraService', CameraService);

})();
