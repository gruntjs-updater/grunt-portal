var router = require('express').Router();
var proxy = require('http-proxy').createProxyServer();

module.exports = function(options) {

    if (options.proxies) {
        Object.keys(options.proxies).forEach(function(path) {
            router.all(path, function(req, res, next) {
                proxy.web(req, res, { 
                    target: options.proxies[path],
                    headers: {
                        host: options.proxies[path].host
                    }
                });
            });
        });
    }

    return router;

}
