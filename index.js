'use strict';

/**
* Module dependencies.
*/
var colors  = require('colors');
var logger  = require('mm-node-logger')(module);
var mongodb = require('mm-mongoose-connection');
var pkg     = require('./package.json');
var config  = require('./server/config/config');
var express = require('./server/config/express');

// Initialize mongoose
mongodb(config.mongodb, function startServer(db) {
    // Initialize express
    var app = express.init(db);

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

