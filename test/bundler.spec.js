var Bundler = require("../src/bundler");
var stream = require("stream");
var fs = require("fs");
var tester = require("./tester");

describe("bundler", function() {
  it("bundles testapp", function(done) {

    var bundler = new Bundler({
      dir:__dirname + "/testapp"
    });
  	var nullWriteable = new stream.Writable();
  	var out = "";
  	nullWriteable._write = function(chunk, encoding, callback){
  		out += chunk;
  		callback();
  	};
    bundler.bundle().on("end",function(){
    	tester.testBundle(out);
    	done();
    }).pipe(nullWriteable);
  },10000);
});