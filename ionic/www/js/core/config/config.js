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

        // set material design template
        //$mdThemingProvider.theme('default')
        //    .primaryPalette('teal')
        //    .accentPalette('brown')
        //    .warnPalette('deep-orange');

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API Route
        RestangularProvider.setBaseUrl(SERVER_API_URL);

        // set the `id` field to `_id`
        RestangularProvider.setRestangularFields({
            id: '_id'
        });

        $urlRouterProvider.otherwise('/signin');
    }

    /* @ngInject */
    function onRun($ionicPlatform, $rootScope, $location, Authentication) {
        $ionicPlatform.ready(function() {
            // save user profile details to $rootScope
            $rootScope.me = Authentication.getCurrentUser();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if(toState.data.authenticate && !Authentication.isAuthenticated()) {
                    console.log('No authorized!');
                    event.preventDefault();
                    $location.path('/#/signin');
                }
            });
        });
    }

    angular
        .module('app.core')
        .config(onConfig)
        .run(onRun)
        .constant('SERVER_API_URL', 'http://127.0.0.1:3000'); //192.168.0.100 - 172.20.10.3
})();
