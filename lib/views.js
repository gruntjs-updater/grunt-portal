var hbs = require('hbs');
var join = require('path').join;
var fs = require('fs');

module.exports = function(app, options) {

    app.set('views', join(options.publicDir, 'views'));
    app.set('view engine', 'hbs');

    hbs.registerPartials(join(options.publicDir, 'views', 'partials'));

    var dir = options.helpersDir;
    if (dir) {
        fs.readdir(dir, function(err,list){
            if( err){
                console.log(err);
            } else {
                list.forEach(function (file) {
                    if(!file.match(/\.js$/)) {
                        return;
                    }
                    var name = file.replace(/\.js$/, '');
                    var func = require(join(process.cwd(),dir,file));
                    hbs.registerHelper(name, func);
                });
            }
        });
    }
};
