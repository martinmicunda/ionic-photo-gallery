/**
 * Token service.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name Token
     * @module app.core
     * @requires localStorageService
     * @requires Base64
     *
     * @description
     * The `Token` service store token to local storage, cookie or memory.
     *
     * @ngInject
     */
    function Token(localStorageService, Base64) {
        /**
         * @type {string}
         * @private
         */
        var _tokenStorageKey = 'token';
        /**
         * @type {string}
         * @private
         */
        var _cachedToken = '';

        /**
         * @ngdoc method
         * @name Token#set
         * @description Set token.
         * @param {string} token
         */
        var set = function(token) {
            _cachedToken = token;
            localStorageService.set(_tokenStorageKey, token)
        };
        /**
         * @ngdoc method
         * @name Token#get
         * @description Get token.
         * @returns {string} token
         */
        var get = function() {
            if (!_cachedToken) {
                _cachedToken = localStorageService.get(_tokenStorageKey);
            }
            return _cachedToken;
        };
        /**
         * @ngdoc method
         * @name Token#remove
         * @description Remove token.
         */
        var remove = function() {
            _cachedToken = null;
            localStorageService.remove(_tokenStorageKey);
        };
        /**
         * @ngdoc method
         * @name Token#decodeToken
         * @description Decode the token.
         */
        var decodeToken = function(token) {
            var parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('JWT must have 3 parts');
            }

            // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
            var encoded = parts[1];

            // decode user data from payload token
            var decoded = Base64.decode(encoded);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }

            return JSON.parse(decoded);
        };

        return {
            set: set,
            get: get,
            remove: remove,
            decodeToken: decodeToken
        }
    }

    angular
        .module('app.core')
        .factory('Token', Token);
})();
