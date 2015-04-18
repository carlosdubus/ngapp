var exec = require('child_process').exec;
var tester = require("./tester");

describe("cmd", function() {
    it("should bundle", function(done) {
        var child = exec('node ./bin/cmd.js ./test/testapp',
            function(error, stdout, stderr) {
                tester.testBundle(stdout);
                expect(stderr).toEqual("");
                done();
            });
    });
});