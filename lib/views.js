var hbs = require('hbs');
var join = require('path').join;
var fs = require('fs');

module.exports = function(app, options) {

    var helpersDir = options.helpersDir || join(options.publicDir, 'helpers');
    var viewsDir = options.viewsDir || join(options.publicDir, 'views');
    var partialsDir = options.partialsDir || join(viewsDir, 'partials');

    if (viewsDir && fs.existsSync(viewsDir) && fs.statSync(viewsDir).isDirectory()) {
        app.set('views', viewsDir);
        app.set('view engine', 'hbs');
    } else {
        process.exit(1);
    }

    if (partialsDir && fs.existsSync(partialsDir) && fs.statSync(partialsDir).isDirectory()) {
        hbs.registerPartials(partialsDir);
    }

    if (helpersDir && fs.existsSync(helpersDir) && fs.statSync(helpersDir).isDirectory()) {
        fs.readdir(helpersDir, function(err,list){
            if( err ){
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
