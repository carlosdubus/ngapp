var browserify = require('browserify');
var fs = require("fs");
var extend = require("extend");
var path = require("path");
var glob = require("glob");
var stream = require("stream");

function Bundler(args){
    this.dir = null;
    extend(this,args);
}

Bundler.prototype = {

    bundleDir:function bundle(args) {
        var args = extend({},this, args);
        args = extend({
            baseDir:path.dirname(args.dir)
        },args);

        var mainStream = createBfyMain(args);
        //fs.writeFileSync(__dirname + "/../tmp/main.js", mainStream);


        var b = browserify({
            debug: false,
            basedir:args.baseDir
        });
        b.add(mainStream);
        return b.bundle();
    },
    bundle:function(args){
        return this.bundleDir(args);
    }
};

function getRelative(file,baseDir){
    return "."+file.replace(baseDir,"");
}

function strToStream(str){
    var s = new stream.Readable();
    s._read = function noop() {}; 
    s.push(str);
    s.push(null);
    return s;
}

/**
* Creates the main file to pass to browserify, right now this function is sync
*/
function createBfyMain(args) {
    var mainStream = 'var angular = window.angular;var app = require("' + getRelative(args.dir,args.baseDir) + '")(angular);';
    var files = glob.sync(args.dir+"/**/*.js");
    for(var i=0;i<files.length;i++){
        processFile(files[i]);
    }
    return strToStream(mainStream);

    function processFile(file) {
        var relative = file.replace(args.dir, "");
        // index.js is reserved to the main module
        if (relative == "/index.js") {
            return;
        }

        mainStream += 'require("' + getRelative(file,args.baseDir) + '")(app);'
    }
}

module.exports = Bundler;