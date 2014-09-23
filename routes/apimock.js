var ApiMock = require('api-mock');
var express = require('express');

module.exports = function(options) {

    var router = express.Router();

    new ApiMock({
        blueprintPath: options.blueprint,
        express: function() { return router },
        options: {}
    }).run();

    return router;

}
