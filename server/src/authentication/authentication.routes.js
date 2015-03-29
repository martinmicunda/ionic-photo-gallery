/**
 * Authentication routes.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var authentication = require('./authentication.controller.js');

/**
 * Set authentication routes.
 *
 * @param {Object} app The express application
 */
function setAuthenticationRoutes(app) {
    app.route('/auth/signin').post(authentication.signin);
    app.route('/auth/signout').get(authentication.signout);
    app.route('/auth/signup').post(authentication.signup);
}

module.exports = setAuthenticationRoutes;
