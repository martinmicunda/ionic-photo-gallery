/**
 * Image model.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var User = require('../user/user.model.js');

/**
 * Image Schema
 */
var ImageSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('Image', ImageSchema);
