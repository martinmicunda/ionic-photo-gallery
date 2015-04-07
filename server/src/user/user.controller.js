/**
 * User controller.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var logger = require('mm-node-logger')(module);
var User   = require('./user.model.js');

/**
 * Find an user by id.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Object} the user corresponding to the specified id
 * @api public
 */
function findById(req, res) {
    return User.findById(req.params.id, 'name email avatar', function (err, user) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(user);
        }
    });
}

/**
 * List of users.
 *
 * @param {Object} req The request object
 * @param {Object} res The request object
 * @returns {Array} the list of users
 * @api public
 */
function findAll(req, res) {
    User.find(function(err, users) {
        if (err) {
            logger.error(err.message);
            return res.status(400).send(err);
        } else {
            res.json(users);
        }
    });
}

module.exports = {
    findById: findById,
    findAll: findAll
};
