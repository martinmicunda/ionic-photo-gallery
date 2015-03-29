/**
 * Image routes.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var image          = require('./image.controller.js');
var authentication = require('../authentication/authentication.controller.js');

/**
 * Set image routes.
 *
 * @param {Object} app The express application
 */
function setImageRoutes(app) {
    app.route('/images').post(authentication.isAuthenticated, image.create);
    app.route('/images').get(authentication.isAuthenticated, image.findByUser);
}

module.exports = setImageRoutes;
