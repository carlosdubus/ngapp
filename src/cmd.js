var build = require("./build");
var path = require("path");

function run(argv){
	argv = require('minimist')(argv);

	if(argv._[0] == "build"){
		runBuild(argv);
	}
}

function runBuild(args){
	build({
		dir:path.resolve(args._[1])
	}).pipe(process.stdout);
}

module.exports = run;