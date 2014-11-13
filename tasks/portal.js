/*
 * grunt-portal
 * https://github.com/reaktivo/grunt-portal
 *
 * Copyright (c) 2014 Marcel Miranda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('portal', 'Run development environment', function() {
    var options = this.options();
    options.background = (options.background || this.flags.background);
    options.done = this.async();
    var app = require('../lib/app')(options);
  });

};
