var Bundler = require("../src/bundler");
var stream = require("stream");
var fs = require("fs");
var tester = require("./tester");


function createNullWritable(output) {
    var nullWriteable = new stream.Writable();
    output.res = "";
    nullWriteable._write = function(chunk, encoding, callback) {
        output.res += chunk;
        callback();
    };
    return nullWriteable;
}

describe("bundler", function() {
    it("bundles testapp directory", function(done) {

        var bundler = new Bundler({
            dir: __dirname + "/testapp"
          });
        
        var output = {};
        var nullWriteable = createNullWritable(output);

        bundler.bundle().on("end", function() {
            tester.testBundle(output.res);
            done();
        }).pipe(nullWriteable);
    });
    it("bundles single file", function(done) {

        var bundler = new Bundler({
            dir: __dirname + "/fixtures/single-file.js"
        });
        
        var output = {};
        var nullWriteable = createNullWritable(output);

        bundler.bundle().on("end", function() {
            expect(output.res).toContain("single-app-test");
            done();
        }).pipe(nullWriteable);
    });
});