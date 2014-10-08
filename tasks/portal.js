/*
 * grunt-portal
 * https://github.com/reaktivo/grunt-portal
 *
 * Copyright (c) 2014 Marcel Miranda
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('portal', 'Run development environment', function() {
    var done, options = this.options();
    if(!options.background) {
    	this.async();
    }
    var app = require('../lib/app')(options);
  });

};
