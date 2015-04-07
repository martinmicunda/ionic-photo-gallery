/**
 * User model.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var bcrypt   = require('bcryptjs');
var mongoose = require('mongoose');

var SALT_WORK_FACTOR = 10;
var authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * User Schema
 */
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://raw.githubusercontent.com/martinmicunda/employee-scheduling-ui/master/src/images/anonymous.jpg?123456'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Validations
 */
// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function(password) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return password.length;
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function(err, user) {
            if(err) throw err;
            if(user) {
                if(self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');

/**
 * Pre-save hook (execute before each user.save() call)
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) { return next(); }

    // password changed so we need to hash it (generate a salt)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { return next(err); }

        // TODO (martin): is it good idea to store salt?
        // store salt
        user.salt = salt;

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { return next(err); }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Check if the passwords are the same.
 *
 * @param {String}   password The user password
 * @param {Function} cb       Callback function
 * @returns {Function} callback function `callback(null, true)` if password matched
 */
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
