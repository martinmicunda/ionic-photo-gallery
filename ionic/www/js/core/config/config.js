/**
 * Core configuration.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /* @ngInject */
    function onConfig($urlRouterProvider, RestangularProvider, localStorageServiceProvider, SERVER_API_URL) {
        // use "ionic-photo-gallery" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
        localStorageServiceProvider.setPrefix('ionic-photo-gallery');

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API Route
        RestangularProvider.setBaseUrl(SERVER_API_URL);

        // set the `id` field to `_id`
        RestangularProvider.setRestangularFields({
            id: '_id'
        });

        // for any unmatched url, send to 404 page (Not page found)
        //$urlRouterProvider.otherwise('/404');

        // the `when` method says if the url is `/` redirect to `/signin`
        //$urlRouterProvider.when('/', '/#/galleries');
        //$urlRouterProvider.otherwise('/galleries');
    }

    /* @ngInject */
    function onRun($ionicPlatform, $rootScope, $location, Authentication) {
        // save user profile details to $rootScope
        $rootScope.me = Authentication.currentUser;

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on("$stateChangeStart", function (event, toState) {
            if(toState.data.authenticate && !Authentication.isAuthenticated()) {
                console.log('No authorized!');
                event.preventDefault();
                $location.path('/');
            }
        });
    }

    angular
        .module('app.core')
        .config(onConfig)
        .run(onRun)
        .constant('SERVER_API_URL', 'http://127.0.0.1:3000'); //192.168.0.100
})();
