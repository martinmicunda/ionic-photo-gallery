'use strict';

/**
 * Module dependencies.
 */
var authentication = require('./authentication.controller.js');

function setAuthenticationRoutes(app) {
    app.route('/auth/signin').post(authentication.signin);
    app.route('/auth/signout').get(authentication.signout);
    app.route('/auth/signup').get(authentication.signup);
}

module.exports = setAuthenticationRoutes;
