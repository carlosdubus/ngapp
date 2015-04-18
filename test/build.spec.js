var build = require("../src/build");
var stream = require("stream");
var fs = require("fs");

describe("build", function() {
  it("builds", function(done) {

  	var nullWriteable = new stream.Writable();
  	var out = "";
  	nullWriteable._write = function(chunk, encoding, callback){
  		out += chunk;
  		callback();
  	};

    build({
    	dir:__dirname + "/testapp"
    }).on("end",function(){

    	expect(out).toContain("HomeCtrl")
    	done();
    }).pipe(nullWriteable);
  },10000);
});