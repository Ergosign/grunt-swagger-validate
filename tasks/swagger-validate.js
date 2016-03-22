/*
 * grunt-swagger-utils
 * https://github.com/Ergosign/grunt-swagger-validate
 *
 * Copyright (c) 2016 Al Briggs
 * Licensed under the MIT license.
 */


'use strict';
var SwaggerParser = require('swagger-parser');

module.exports = function (grunt) {

    grunt.task.registerTask('swagger-validate', 'A task to validate swagger files', function (arg1, arg2) {

        var done = this.async();

        var options = this.options();

        var swaggerFiles = grunt.file.expand([options.src]);

        var validationRuns = 0;
        var validationError;
        swaggerFiles.forEach(function (fileName) {
            SwaggerParser.validate(fileName, function (err, api) {
                if (err) {
                    validationError = err;
                }
                else {
                    console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                }
                validationRuns = validationRuns + 1;
                if (validationRuns >= swaggerFiles.length) {
                    done(validationError);
                }
            });

        });

    });
};
