'use strict';

var User = require('./user.model.js');

exports.get = function(req,res) {
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};
