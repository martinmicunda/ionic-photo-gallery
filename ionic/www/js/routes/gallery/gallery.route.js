(function () {
    'use strict';

    /**
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
