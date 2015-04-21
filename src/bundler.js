var browserify = require('browserify');
var fs = require("fs");
var extend = require("extend");
var path = require("path");
var glob = require("glob");

function Bundler(args){
    this.dir = null;
    extend(this,args);
}

Bundler.prototype = {

    bundleDir:function bundle(args) {
        args = extend({},this, args);

        var mainStream = createBfyMain(args);
        fs.writeFileSync(__dirname + "/../tmp/main.js", mainStream);


        var b = browserify({
            debug: false
        });
        b.add(__dirname + "/../tmp/main.js");
        return b.bundle();
    },
    bundle:function(args){
        return this.bundleDir(args);
    }
};

/**
* Creates the main file to pass to browserify, right now this function is sync
*/
function createBfyMain(args) {
    var mainStream = 'var angular = window.angular;var app = require("' + args.dir + '")(angular);';
    var files = glob.sync(args.dir+"/**/*.js");
    for(var i=0;i<files.length;i++){
        processFile(files[i]);
    }
    return mainStream;

    function processFile(file) {
        var relative = file.replace(args.dir, "");
        // index.js is reserved to the main module
        if (relative == "/index.js") {
            return;
        }

        mainStream += 'require("' + file + '")(app);'
    }
}

module.exports = Bundler;