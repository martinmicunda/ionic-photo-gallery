/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var colors  = require('colors');
var logger  = require('mm-node-logger')(module);
var pkg     = require('./package.json');
var config  = require('./src/config/config');
var express = require('./src/config/express');
var mongodb = require('./src/config/mongoose');

// Initialize mongoose
mongodb(function startServer() {
    // Initialize express
    var app = express.init();

    // Start up the server on the port specified in the config after we connected to mongodb
    app.listen(config.server.port, function () {
        var serverBanner = ['',
            '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
            '*',
            '* ' + pkg.description ,
            '* @version ' + pkg.version,
            '* @author ' + pkg.author.name,
            '* @copyright ' + new Date().getFullYear() + ' ' + pkg.author.name,
            '* @license ' + pkg.license.type + ', ' + pkg.license.url,
            '*',
            '*' + ' App started on port: '.blue + config.server.port + ' - with environment: '.blue + config.environment.blue,
            '*',
            '*************************************************************************************************',
            ''].join('\n');
        logger.info(serverBanner);
    });

    module.exports = app;
});

