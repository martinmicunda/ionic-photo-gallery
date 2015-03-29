(function () {
    'use strict';

    /**
     * @ngInject
     */
    function GalleryCtrl(images) {
        var vm = this;
        vm.images = images;
    }

    angular
        .module('app.gallery')
        .controller('GalleryCtrl', GalleryCtrl);
})();
