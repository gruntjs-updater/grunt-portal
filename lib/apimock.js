var webmock = require('webmockjs');

module.exports = function(options) {

    return webmock({
        path: options.webmockDir
    });

};
