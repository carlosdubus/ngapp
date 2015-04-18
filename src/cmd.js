var Bundler = require("./bundler");
var path = require("path");

function run(argv){
	argv = require('minimist')(argv);
	runBundle(argv);
}

function runBundle(args){
	var dir = args._[0];
	if(!dir){
		dir = ".";
	}

	var bundler = new Bundler({
		dir:path.resolve(dir)
	});

	bundler.bundle().on("error",function(err){
		console.error(err);
	}).pipe(process.stdout);
}

module.exports = run;