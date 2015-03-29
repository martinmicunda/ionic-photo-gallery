(function () {
    'use strict';

    /**
     * @ngInject
     */
    function galleriesRoute($stateProvider) {
        $stateProvider
            .state('app.galleries', {
                url: '/galleries',
                views: {
                    'menuContent': {
                        templateUrl: 'js/routes/galleries/galleries.html',
                        controller: 'GalleriesCtrl as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            });
    }

    angular
        .module('app.galleries')
        .config(galleriesRoute);

})();
