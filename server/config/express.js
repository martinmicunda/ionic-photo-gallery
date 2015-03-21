'use strict';

/**
 * Module dependencies.
 */
var path           = require('path');
var config         = require('./config');
var morgan         = require('morgan');
var helmet         = require('helmet');
var logger         = require('mm-node-logger')(module);
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

/**
 * Initialize application middleware.
 *
 * @method initMiddleware
 * @param {Object} app The express application
 * @private
 */
function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    // Environment dependent middleware
    if (config.environment === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));

        // Disable views cache
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
}

/**
 * Configure Helmet headers configuration.
 *
 * @method initHelmetHeaders
 * @param {Object} app The express application
 * @private
 */
function initHelmetHeaders(app) {
    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
}

/**
 * Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
 *
 * @method initCrossDomain
 * @param {Object} app The express application
 * @private
 */
function initCrossDomain(app) {
    // setup CORS
    app.use(function(req, res, next) {
        // Website you wish to allow to connect
        res.set('Access-Control-Allow-Origin', '*');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.set('Access-Control-Allow-Credentials', true);
        // Request methods you wish to allow
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        // Request headers you wish to allow
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        // Pass to next layer of middleware
        next();
    });
}

/**
 * Configure error handling.
 *
 * @method initErrorRoutes
 * @param {Object} app The express application
 * @private
 */
function initErrorRoutes(app) {
    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        logger.error('Internal error(%d): %s', res.statusCode, err.stack);

        // Redirect to error page
        res.redirect('/server-error');
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        // Redirect to not found page
        res.redirect('/not-found');
    });
}

/**
 * Initialize the Express application.
 *
 * @method init
 * @param {Object} db Database instance
 * @returns {Object} the express application
 */
function init(db) {
    // Initialize express app
    var app = express();

    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Helmet security headers
    initHelmetHeaders(app);

    // Initialize CORS
    initCrossDomain(app);

    // Initialize error routes
    initErrorRoutes(app);

    return app;
}

module.exports = {
    init: init
};
