(function () {
    'use strict';

    angular.module('app', [
        // angular modules
        'ngAnimate',
        //'ngMessages',
        'ngSanitize',

        // 3rd party modules
        'ui.router',
        'ionic',
        'restangular',
        'LocalStorageModule',
        'ngCordova',

        // app modules
        'app.core',
        'app.signup',
        'app.signin',
        'app.user',
        'app.users',
        'app.gallery',
        'app.galleries'
    ]);

})();
