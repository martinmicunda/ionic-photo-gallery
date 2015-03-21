'use strict';

/**
 * Module dependencies.
 */
var redis  = require('redis');
var config = require('./config');
var logger = require('mm-node-logger')(module);

var redisClient = redis.createClient(config.redis.port, config.redis.host);

redisClient.on('error', function (err) {
    logger.error('Redis error: ' + err);
});

redisClient.on('connect', function () {
    logger.info('Redis connected to ' + config.redis.host + ':' + config.redis.port);
});

module.exports = redisClient;

