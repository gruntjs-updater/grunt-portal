var hbs = require('hbs');
var join = require('path').join;
var fs = require('fs');

module.exports = function(app, options) {

    var helpersDir = options.helpersDir || join(options.publicDir, 'helpers');
    var viewsDir = options.viewsDir || join(options.publicDir, 'views');
    var partialsDir = options.partialsDir || join(viewsDir, 'partials');

    app.set('views', viewsDir);
    app.set('view engine', 'hbs');

    hbs.registerPartials(partialsDir);

    if (helpersDir) {
        fs.readdir(helpersDir, function(err,list){
            if( err){
                console.log(err);
            } else {
                list.forEach(function (file) {
                    if(!file.match(/\.js$/)) {
                        return;
                    }
                    var name = file.replace(/\.js$/, '');
                    var func = require(join(process.cwd(), helpersDir, file));
                    hbs.registerHelper(name, func);
                });
            }
        });
    }
};
