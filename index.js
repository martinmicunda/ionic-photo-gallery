'use strict';

/**
* Module dependencies.
*/
var colors  = require('colors');
var logger  = require('mm-node-logger')(module);
var pkg     = require('./package.json');
var config  = require('./server/src/config/config');
var express = require('./server/src/config/express');
var mongodb = require('./server/src/config/mongoose');

// Initialize mongoose
mongodb(function startServer() {
    // Initialize express
    var app = express.init();

    // Start up the server on the port specified in the config after we connected to mongodb
    app.listen(config.server.port, function () {
        var serverBanner = ['',
            '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
            '*',
            `* ${pkg.description}`,
            `* @version ${pkg.version}`,
            `* @author ${pkg.author.name}`,
            `* @copyright ${new Date().getFullYear()} ${pkg.author.name}`,
            `* @license ${pkg.license.type}, ${pkg.license.url}`,
            '*',
            '*' + ` App started on port: ${config.server.port} - with environment: ${config.environment}`.blue,
            '*',
            '*************************************************************************************************',
            ''].join('\n');
        logger.info(serverBanner);
    });
});

