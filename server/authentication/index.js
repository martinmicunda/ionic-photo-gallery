//'use strict';
//
//var express = require('express');
//var User = require('../api/user/user.model.js');
//var config  = require('../config/config');
//
//module.exports = function(app) {
//    // Passport Configuration
//    require('./local/passport').setup(User, config);
//
//    var router = express.Router();
//
//    router.use('/local', require('./local/index'));
//
//    app.use('/auth', router);
//
////    Notes:
////        POST http://your.api.com/authentication for login
////        DELETE http://your.api.com/authentication for logout
//};
//
//// check this https://github.com/onmodulus/modulus-cli/blob/master/lib%2Fcontrollers%2Fuser.js
