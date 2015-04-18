var browserify = require('browserify');
var fs = require("fs");
var extend = require("extend");



function createBfyMain(args){
	var mainStream = 'var angular = require("angular");var app = require("'+args.dir+'")(angular);';

	processDirectory(args.dir);

	function processDirectory(dir){
		var files = fs.readdirSync(dir);
		for(var i=0;i<files.length;i++){
			processFile(dir+"/"+files[i]);
		}
	}

	function processFile(file){
		stats = fs.lstatSync(file);


	    // Is it a directory?
	    if (stats.isDirectory()) {
	        return processDirectory(file);
	    }

	    var relative = file.replace(args.dir,"");

	    if(relative=="/index.js"){
	    	return;
	    }

	    mainStream += 'require("'+file+'")(app);'

	}

	return mainStream;
}

function build(args){
	args = extend({
		dir:"", //
	},args);

	var mainStream = createBfyMain(args);
	fs.writeFileSync(__dirname+"/../tmp/main.js",mainStream);


	var b = browserify({debug:false});
	b.add(__dirname+"/../tmp/main.js");
	return b.bundle();
}

module.exports = build;
module.exports.createBfyMain = createBfyMain;