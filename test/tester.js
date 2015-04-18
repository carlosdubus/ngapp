exports.testBundle = function(bundleString){
	expect(bundleString).toContain("HomeCtrl");
}