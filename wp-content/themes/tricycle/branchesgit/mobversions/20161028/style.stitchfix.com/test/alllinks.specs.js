'use strict';
var expect = chai.expect;
describe('Blogs Applying different html and utm params part', function () {
    describe("Checking basic variable and object", function () {
        
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['index.html'];
            }
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");
            window.site_q = '';
        });

        it("Test-1: all content are appended perfectly", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var element = $(this)[0];
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var isStyle = $(element).attr("href").indexOf('style.stitchfix.com/gifts');
                var tUrl = $(element).attr("href");
                var isStyleDomain = tUrl.search("style.stitchfix") >= 0 ? true : false;
                for (var x in testAllowedParams) {
                    if (isStyle !== -1) {
                        console.log("utmID");
                        console.log(utmID);
                        console.log(testAllowedParams[x])
                        if (testAllowedParams[x] == 'utm_campaign') {
                            testParam = testAllowedParams[x] + '=' + utmID;
                        } else {
                            testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        }
                        var testAnchor = $(element).attr("href").indexOf(testParam);
                    } else {
                        testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        if (isStyleDomain && testAllowedParams[x] == 'utm_campaign') {
                            testParam = testAllowedParams[x] + '=' + utmID;
                        } else {
                            testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        }
                        var testAnchor = $(element).attr("href").indexOf(testParam);
                    }
                    if (testAnchor === -1) {
                        console.log(element);
                    }
                    expect(testAnchor).to.be.above(-1);
                }
            });
        });
    });
});
