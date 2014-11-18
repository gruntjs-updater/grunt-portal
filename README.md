# grunt-portal

> Get a development environment up and running

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-portal --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-portal');
```

## The "portal" task

### Overview
In your project's Gruntfile, add a section named `portal` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  portal: {
    // dev is your target name
    dev: {
      options: {
        // Task-specific options go here.
      }
    }
  },
});
```

### Options

#### options.blueprint
Type: `String`
Default value: `''`

Path to blueprint file which will be used to start a api mock server at the root of the server and Aglio documentation at `/doc/api`


#### options.publicDir
Type: `String`
Default value: ``

Directory from which views and static files will be served.


#### options.docsDir
Type: `String`
Default value: ``

Files inside this directory will be served as documentation, You will be able to access `/doc/{pathname}.md` at `/doc/{pathname}`.


#### options.helpersDir
Type: `String`
Default value: ``

Files inside this directory will be used as helpers for Handlebars. The file should be a node module file, and the filename (with .js extension) will be used as the helper name (removing the extension).

For example, filename `compare.js`:

    module.export = function(lvalue, rvalue, options) {

        if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

        operator = options.hash.operator || "==";

        var operators = {
            '==':       function(l,r) { return l == r; },
            '===':      function(l,r) { return l === r; },
            '!=':       function(l,r) { return l != r; },
            '<':        function(l,r) { return l < r; },
            '>':        function(l,r) { return l > r; },
            '<=':       function(l,r) { return l <= r; },
            '>=':       function(l,r) { return l >= r; },
            'typeof':   function(l,r) { return typeof l == r; }
        }

        if (!operators[operator])
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

        var result = operators[operator](lvalue,rvalue);

        if( result ) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    };

Would be used as `{{#compare var_a var_b operator='!='}}`


#### options.routes
Type: `String`
Default value: {}

A map where object keys will be used as uri routes that route into local files.


#### options.proxies
Type: `String`
Default value: {}

A map where object keys will be used as uri paths to intercept and redirect to proxy.

For example:

    proxies: {
        "/ws/*": {
            host: "api.example.com",
            port: "80"
        }
    }

will redirect any request to `localhost:3000/ws/my_service.php` to `api.example.com/ws/my_service.php`.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
