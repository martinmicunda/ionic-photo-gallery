'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var authentication = require('./authentication.controller');

var router = express.Router();

router.post('/signin', authentication.signin);
router.get('/signout', authentication.isAuthenticated, authentication.signout);

app.use('/auth', router);
