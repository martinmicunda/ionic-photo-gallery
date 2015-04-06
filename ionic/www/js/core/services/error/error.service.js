/**
 * Authentication interceptor.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @description
     * The http interceptor that listens for errors.
     *
     * @param $q
     * @param $cordovaDialogs
     * @returns {{responseError: responseError}}
     * @constructor
     * @ngInject
     */
    function ErrorInterceptor($q, $cordovaDialogs) {
        return {
            responseError: function (rejection) {
                if(rejection != null && rejection.status === 401) {
                    $cordovaDialogs.alert('The username or password you entered is incorrect.', 'Disconnected', 'OK');
                } else if(rejection != null && rejection.status === 0) {
                    $cordovaDialogs.alert('Couldn\'t connect to the internet please check your network connection.', 'Network Error', 'OK');
                } else if(rejection != null ) {
                    $cordovaDialogs.alert('An error occurred on the system, please contact the system administrator.', 'Error', 'OK');
                }
                return $q.reject(rejection);
            }
        };
    }

    angular
        .module('app.core')
        .factory('ErrorInterceptor', ErrorInterceptor)
        .config(function ($httpProvider) {
            // we have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
            $httpProvider.interceptors.push('ErrorInterceptor');
        });
})();
