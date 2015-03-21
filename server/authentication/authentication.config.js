'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    User = require('mongoose').model('User'),
    path = require('path'),
    config = require(path.resolve('./config/config'));

module.exports = function(app) {
    // Initialize strategies
    //config.utils.getGlobbedPaths(path.join(__dirname, './strategies/**/*.js')).forEach(function(strategy) {
    //    require(path.resolve(strategy))(User, config);
    //});

    // Add passport's middleware
    app.use(passport.initialize());
};
