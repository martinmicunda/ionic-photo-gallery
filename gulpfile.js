'use strict';

//=============================================
//               DEPENDENCIES
//=============================================

/**
 * Load required dependencies.
 */
var gulp = require('gulp');

/**
 * Load Gulp plugins listed in 'package.json' and attaches
 * them to the `$` variable.
 */
/*jshint -W079 */
var $ = require('gulp-load-plugins')();


//=============================================
//            DECLARE GULP VARIABLES
//=============================================

/**
 * Declare constants that are use in gulpfile.js
 */
var log    = $.util.log;
var argv   = $.util.env;
var ENV    = !!argv.env ? argv.env : 'development';
var COLORS = $.util.colors;


//=============================================
//            COMMAND LINE ERROR HANDLING
//=============================================

if(!ENV.match(new RegExp(/prod|dev|test/))) {
    log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV +'\'! Usage: gulp test:e2e --env=(prod|dev|test)'));
    return process.exit(1);
}


//=============================================
//                HELPER
//=============================================

/**
 * Add the ability to provide help text to custom gulp tasks. Usage: `gulp help`
 */
$.help(gulp);

//=============================================
//               SUB TASKS
//=============================================

gulp.task('serve', function () {
    var options = {
        script: './index.js',
        ext: 'js json',
        ignore: ['node_modules/**'],
        stdout: false,
        stderr: false,
        nodeArgs: ['--debug', '--harmony_arrow_functions', '--harmony_modules'],
        watch: ['lib/**/*', 'index.js']
    };

    $.nodemon(options)
        //.on('change', ['jshint'])
        .on('restart', function (files) {
            log('[server] App restarted due to: ', COLORS.cyan(files));
        }).on('stdout', function(raw) {
            var msg = raw.toString('utf8');
            log('[server]', COLORS.green(msg));
            if(msg.indexOf('avisi-website has started') !== -1) {
                //refresh(browser);
            }
        }).on('stderr', function(err) {
            var msg = err.toString('utf8');

            // For some reason debugger attachment gets logged on 'stderr', so we catch it here...
            if (msg.indexOf('debugger listening on port') === 0) {
                log('[server]', COLORS.green(msg));
            } else {
                log('Node server ' + COLORS.red(err));
            }
        });
});

/**
 * The 'jshint' task defines the rules of our hinter for server as well as which files we
 * should check. This file, all javascript sources.
 */
gulp.task('jshint', 'Hint server JavaScripts files', function () {
    return gulp.src(['**/*.js', '!node_modules'])
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});




