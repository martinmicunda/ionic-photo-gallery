'use strict';

/**
 * Module dependencies.
 */
var user = require('./user.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setUserRoutes(app) {
    app.route('/users/get').get(authentication.isAuthenticated, user.get);
}

module.exports = setUserRoutes;
