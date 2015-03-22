'use strict';

var passport = require('passport');
var logger   = require('mm-node-logger')(module);
var token    = require('./token.controller.js');

function signin(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

        token.createToken(user, function(res, err, token) {
            if (err) {
                logger.error(err);
                return res.sendStatus(400);
            }

            res.json(200, {token: token});
        }.bind(null, res));
    })(req, res, next)
}

function signout(req, res) {
    if (req.user) {
        token.expireToken(req.headers, function(err, success) {
            if (err) {
                logger.error(err);
                return res.sendStatus(401);
            }

            if(success) {
                delete req.user;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        return res.sendStatus(401);
    }
}

/**
 * Create new user
 *
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {*}
 */
function signup(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (email == '' || password == '' || password != passwordConfirmation) {
        return res.sendStatus(400);
    }

    // Init Variables
    var user = new User(req.body);
    var message = null;

    // Add missing user fields
    user.provider = 'local';

    // Then save the user
    user.save(function(err) {
        if (err) {
            return res.sendStatus(400).send({
                message: err
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.sendStatus(400).send(err);
                } else {
                    res.json(user);
                }
            });
            return res.send(200);
        }
    });
}

/**
 * Middleware to verify the token and attaches the user object to the request if authenticated.
 *
 * @param req
 * @param res
 * @param next
 */
function isAuthenticated(req, res, next) {
    token.verifyToken(req.headers, function(next, err, data) {
        if (err) {
            logger.error(err);
            return res.sendStatus(401);
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
