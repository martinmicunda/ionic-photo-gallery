/**
 * Authentication controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var logger   = require('mm-node-logger')(module);
var passport = require('passport');
var token    = require('./token.controller.js');
var User     = require('../user/user.model.js');

/**
 * Signin with email after passport authentication.
 *
 * @param {Object} req  The request object
 * @param {Object} res  The request object
 * @param {Object} next The request object
 * @returns {Object} the new created JWT token
 * @api public
 */
function signin(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.status(401).send(error);

        // Remove sensitive data before login
        user.password = undefined;
        user.salt = undefined;

        token.createToken(user, function(res, err, token) {
            if(err) {
                logger.error(err);
                return res.status(400).send(err);
            }

            res.status(201).json({token: token});
        }.bind(null, res));
    })(req, res, next)
}

/**
 * Signout user and expire token.
 *
 * @param {Object} req  The request object
 * @param {Object} res  The request object
 * @api public
 */
function signout(req, res) {
    token.expireToken(req.headers, function(err, success) {
        if (err) {
            logger.error(err.message);
            return res.status(401).send(err.message);
        }

        if(success) {
            delete req.user;
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
}

/**
 * Create new user and login user in.
 *
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Object} the new created JWT token
 * @api public
 */
function signup(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
        return res.sendStatus(400);
    }

    // Init Variables
    var user = new User(req.body);
    // Add missing user fields
    user.provider = 'local';

    // Then save the user
    user.save(function(err, user) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            token.createToken(user, function(res, err, token) {
                if (err) {
                    logger.error(err.message);
                    return res.status(400).send(err);
                }

                res.status(201).json({token: token});
            }.bind(null, res));
        }
    });
}

/**
 * Middleware to verify the token and attaches the user object
 * to the request if authenticated.
 *
 * @param {Object} req  The request object
 * @param {Object} res  The request object
 * @param {Object} next The request object
 * @api public
 */
function isAuthenticated(req, res, next) {
    token.verifyToken(req.headers, function(next, err, data) {
        if (err) {
            logger.error(err.message);
            return res.status(401).send(err.message);
        }

        req.user = data;

        next();
    }.bind(null, next));
}

module.exports = {
    signin: signin,
    signout: signout,
    signup: signup,
    isAuthenticated: isAuthenticated
};
