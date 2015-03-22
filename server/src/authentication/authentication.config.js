'use strict';

/**
 * Module dependencies.
 */
//var User     = require('mongoose').model('User');
    var User = {};
var path      = require('path');
var passport  = require('passport');
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
