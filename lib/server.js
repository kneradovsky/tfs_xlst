
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');

var Configuration = require("./configuration");

var config = new Configuration();



var logger=console;

var router = express();
var server = http.createServer(router);
var xslt = require('fluxslt');
var fs = require('fs');

module.exports=Server;


function Server() {
    router.get('/tfsreport',function(req,res) {
        var stylesheet = fs.readFileSync(config.Web.stylesheet);
        var docfile = fs.readFileSync(config.Web.docfile);
        xslt().withStylesheet(stylesheet).runOn(docfile).then(function(result) {
            res.set('Content-Type', 'text/html');
            res.send(result);
        })
    });
    
    server.listen(config.Web.port,config.Web.hostname,511,this.onlistening());
    this.httpserver=server;
    logger.log("current HTTP config:"+JSON.stringify(config.Web));
    
    this.servicesinited=0;
    return this;
};


Server.prototype.stopserver=function() { 
    try {
    this.httpserver.close();
    } catch(err) {
        console.log(err);
    }
}

Server.prototype.initcomplete=function () {};

Server.prototype.onlistening = function() {
    var self=this;
    return function() {
        if(++self.servicesinited>1)
            self.initcomplete();
    }
}

