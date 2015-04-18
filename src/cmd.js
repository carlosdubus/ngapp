var build = require("./build");
var path = require("path");

function run(argv){
	argv = require('minimist')(argv);

	if(argv._[0] == "bundle"){
		runBuild(argv);
	}
}

function runBuild(args){
	var dir = args._[1];
	if(!dir){
		dir = ".";
	}

	build({
		dir:path.resolve(dir)
	}).on("error",function(err){
		console.log(err);
	}).pipe(process.stdout);
}

module.exports = run;