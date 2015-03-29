/**
 * Authentication configuration.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var path      = require('path');
var passport  = require('passport');
var User      = require('../user/user.model.js');
var config    = require('../config/config');
var pathUtils = require('../utils/path-utils');


module.exports = function(app) {
    // Initialize strategies
    pathUtils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function(strategy) {
        require(path.resolve(strategy))(User, config);
    });

    // Add passport's middleware
    app.use(passport.initialize());
};
