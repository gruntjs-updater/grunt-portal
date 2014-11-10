var express = require('express');
var marked = require('marked');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {

    var router = express.Router();

    function ucwords(str){
        return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    }

    function displayMarkdownFile(filename, res){
        var filePath = path.join(options.docsDir, filename);

        if(fs.existsSync(filePath + '.md')) {
            filePath += '.md';
        }

        fs.readFile(filePath, "utf8", function(err,data) {
            if(err){
                if(filename === 'index'){
                    var files = [],
                        dir = fs.readdirSync(options.docsDir),
                        validExtensions = [ '.md', '.markdown' ];

                    // Filter only markdown files
                    dir.filter(function(file){

                        var isFile = fs.statSync(path.join(options.docsDir, file)).isFile();
                        var isMarkdown = validExtensions.indexOf(path.extname(file)) > -1;
                        return isFile && isMarkdown;

                    }).forEach(function(file){

                        var fname = file;
                        fname = fname.replace(/\.(md|markdown)/,'');
                        files.push({
                            filename: file,
                            uri: '/doc/' + fname,
                            title: ucwords(fname.replace(/[_-]/g,' '))
                        });

                    });

                    res.render('docs-index', {
                        files: files
                    });
                } else {
                    res.render('docs-file-not-found',{
                        file: filename
                    });
                }
            } else {
                if(filename === 'index'){
                    var body = marked(data);

                    res.render('docs', {
                        BODY: body
                    });
                } else {
                    var body = marked(data);

                    var indexPath = path.join(options.docsDir, 'index.md');
                    var indexmd = fs.readFileSync(indexPath, "utf8");

                    var index = marked(indexmd);

                    res.render('docs', {
                        INDEX: index,
                        BODY: body
                    });
                }
            }
        });
    }

    router.get('/', function(req, res) {

        displayMarkdownFile('index', res);

    });

    router.get('/*', function(req, res) {

        // Takes the last part of the requested path
        var filename = req.path.split('/').slice(-1).pop();
        displayMarkdownFile(filename, res);

    });

    return router;

}
