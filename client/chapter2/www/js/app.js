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

        // app modules
        'app.core',
        'app.authentication',
        'app.users',
        'app.signup',
        'app.signin'
    ]);

})();
