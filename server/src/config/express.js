/**
 * Express configuration.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var helmet         = require('helmet');
var multer         = require('multer');
var logger         = require('mm-node-logger')(module);
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var pathUtils      = require('../utils/path-utils');
var config         = require('./config');

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

    // Add multipart handling middleware
    app.use(multer({
        dest: './uploads/',
        inMemory: config.uploadFilesInMemory
    }));

    // Setting router and the static folder for uploaded files
    app.use('/uploads', express.static(path.resolve('./uploads')));
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
    app.use(cors());
    app.use(function(req, res, next) {
        // Website you wish to allow to connect
        res.set('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        // Request headers you wish to allow
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');

        // Pass to next layer of middleware
        next();
    });
}

/**
 * Configure app modules config files.
 *
 * @method initGonfig
 * @param {Object} app The express application
 * @private
 */
function initGonfig(app) {
    // Globbing config files
    pathUtils.getGlobbedPaths(path.join(__dirname, '../**/*.config.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

/**
 * Configure app routes.
 *
 * @method initRoutes
 * @param {Object} app The express application
 * @private
 */
function initRoutes(app) {
    // Globbing routing files
    pathUtils.getGlobbedPaths(path.join(__dirname, '../**/*.routes.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
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
        res.sendStatus(500);
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        // Redirect to not found page
        res.sendStatus(404);
    });
}

/**
 * Populate DB with sample data.
 *
 * @method initDB
 * @private
 */
function initDB() {
    if(config.seedDB) {
        require('./seed');
    }
}
/**
 * Initialize the Express application.
 *
 * @method init
 * @returns {Object} the express application
 */
function init() {
    // Initialize express app
    var app = express();

    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Helmet security headers
    initHelmetHeaders(app);

    // Initialize CORS
    initCrossDomain(app);

    // Initialize config
    initGonfig(app);

    // Initialize routes
    initRoutes(app);

    // Initialize error routes
    initErrorRoutes(app);

    // Initialize DB with sample data
    initDB();

    return app;
}

module.exports.init = init;
