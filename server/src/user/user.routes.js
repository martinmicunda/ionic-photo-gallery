'use strict';

/**
 * Module dependencies.
 */
var user = require('./user.controller.js');
var authentication = require('../authentication/authentication.controller.js');

function setUserRoutes(app) {
    app.route('/api/users/get').get(authentication.isAuthenticated, user.get);
    app.route('/api/users').get(authentication.isAuthenticated, user.findAll);
}

module.exports = setUserRoutes;
