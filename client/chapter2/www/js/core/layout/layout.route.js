(function () {
    'use strict';

    /**
     * @ngInject
     */
    function layoutRoutes($stateProvider) {
        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                controller: 'AuthenticationCtrl as vm',
                templateUrl: 'js/core/layout/side-menu.html'
            })
    }

    angular
        .module('app.core')
        .config(layoutRoutes);

})();
