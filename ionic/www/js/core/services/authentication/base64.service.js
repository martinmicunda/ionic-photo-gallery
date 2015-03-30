/**
 * Base64 service.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name Base64
     * @module app.core
     *
     * @description
     * The `Base64` service decode binary data.
     *
     * @ngInject
     */
    function Base64() {
        return {
            // this is used to parse the user profile
            decode: function(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                // base-64: atob decodes, btoa encodes
                return window.atob(output); // polyfill https://github.com/davidchambers/Base64.js
            }
        };

    }

    angular
        .module('app.core')
        .factory('Base64', Base64);

})();
