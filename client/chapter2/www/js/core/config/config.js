(function () {
    'use strict';
    /**
     * @ngdoc object
     * @name MainApp
     * @requires $routeProvider
     * @description
     *
     * This is the main script, which does the following:
     *
     *   - loads all the submodules
     *   - defines routes via `$routeProvider`
     *   - sets html5Mode to true (removes the # from the route in the URI)
     *
     */
    angular
        .module('app.core')
        .config(function ($locationProvider, $provide, $urlRouterProvider, $stateProvider, RestangularProvider, localStorageServiceProvider) {
            // use "ionic-photo-gallery" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
            localStorageServiceProvider.setPrefix('ionic-photo-gallery');

            /*********************************************************************
             * Route provider configuration based on these config constant values
             *********************************************************************/
                // set restful base API Route
                //RestangularProvider.setBaseUrl('/api/' + env.apiVersion);
                RestangularProvider.setBaseUrl('http://192.168.33.20:3000');

                // use the HTML5 History API
            $locationProvider.html5Mode(true);

            // for any unmatched url, send to 404 page (Not page found)
            //$urlRouterProvider.otherwise('/404');

            // the `when` method says if the url is `/` redirect to `/signin`
            //$urlRouterProvider.when('/', '/signin');
        })
        .run(function ($ionicPlatform, $rootScope, $location, Authentication, Restangular, $state, $stateParams) {

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

            // make $state and $stateParams available across all application
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on("$stateChangeStart", function (event, toState) {
                //if(toState.data.authenticate && !Authentication.isAuthenticated()) {
                //    console.log('No authorized!');
                //    event.preventDefault();
                //    $state.go('index');
                //}
            });
        });
})();
