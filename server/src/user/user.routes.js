/**
 * User routes.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var user           = require('./user.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set user routes.
 *
 * @param {Object} app The express application
 */
function setUserRoutes(app) {
    app.route('/users/:id').get(authentication.isAuthenticated, user.findById);
    app.route('/users').get(authentication.isAuthenticated, user.findAll);
}

module.exports = setUserRoutes;
