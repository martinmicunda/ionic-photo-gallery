'use strict';

var passport = require('passport');
var logger   = require('mm-node-logger')(module);
var token    = require('./token.controller');

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
            return res.send(401);
        }

        req.user = data;

        next();
    }.bind(null, next));
}

function signin(req, res, next) {
//        var user = {id: "idr234", name: "martin"};
//    var token = auth.issueToken(user);
//
//    res.jsonp({token: token});
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

        token.createToken(user, function(res, err, token) {
            if (err) {
                logger.error(err);
                return res.send(400);
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
                return res.send(401);
            }

            if(success) {
                delete req.user;
                res.send(200);
            } else {
                res.send(401);
            }
        });
    } else {
        return res.send(401);
    }
}

module.exports = {
    signin: signin,
    signout: signout,
    isAuthenticated: isAuthenticated
};
