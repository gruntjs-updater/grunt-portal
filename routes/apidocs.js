var aglio = require('aglio');
var fs = require('fs');
var watch = require('node-watch');
var router = require('express').Router();

module.exports = function(options) {

    var template = 'default';
    var html = "";

    function update() {
        var blueprint = fs.readFileSync(options.blueprint, 'utf8');
        aglio.render(blueprint, template, function(err, body, warnings) {
            if (err) console.log(err);
            html = body;
        });
    }
    // Read and parse api blueprint
    update();

    // And then watch for changes.
    watch(options.blueprint, update);

    router.get("/", function(req, res) {
        res.send(html);
    });

    return router;

}

