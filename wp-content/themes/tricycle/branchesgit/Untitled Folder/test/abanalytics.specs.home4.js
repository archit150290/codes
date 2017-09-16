'use strict';
var expect = chai.expect;
describe('General Test', function () {
    describe("constructor", function () {
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");
            window.site_q = '';
        });
        after(function () {
            fixture.cleanup();
        });

        it("Test 1 Expected API URL https://ab.ampush.design/", function () {
            expect(apiURL).to.equal('https://ab.ampush.design/');
        });

        it("Test 2 should be object of ratio", function () {
            expect(testConfig).to.be.instanceof(Object);
        });

        it("Test 3 should have 8 variants", function () {
            expect(1).to.equal(Object.keys(testConfig).length);
        });

        it("Test 4 should have a variant from array['q']", function () {
            expect(['q']).to.include(ABalytics.variantName);
        });

        it("Test 5 should have a variant object config Array", function () {
            expect(testConfig).to.have.property(ABalytics.variantName);
        });

        it("Test 6 should not have a variant from array['q']", function () {
            expect(['x', 'y']).to.not.include(ABalytics.variantName);
        });
        it("Test 7 should not have a random number more than 100", function () {
            expect(ABalytics.range).to.be.within(1, 100);
        });

        it("Test 8 should use default utm_medium use as other when if url contains an empty querystring", function () {
            expect(ABalytics.utm_medium).to.equal('other');
        });
        it("Test 9 should use default utm_medium as other when url contains an empty querystring", function () {
            ABalytics.utm_medium = '';
            expect(ABalytics.utm_medium).to.equal('');
        });

        it("Test 10 TestConfig Variable should have variants q=100% Respectively", function () {
            //=====desktop other 
            expect(testConfig).to.have.property('q')
            expect(testConfig['q']).to.have.deep.property('min', 1)
            expect(testConfig['q']).to.have.deep.property('max', 100)
            expect(testConfig['q']).to.have.deep.property('variant_id', 0)
        });

        it("Test 11 All Anchor tags containg all params", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
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
                        var testAnchor = $(this).attr("href").indexOf(testParam);

                        console.log(testParam);
                    } else {
                        testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        var testAnchor = $(this).attr("href").indexOf(testParam);
                    }
                    if (testAnchor === -1) {
                        console.log(this);
                    }
                    expect(testAnchor).to.be.above(-1);
                }
            });
        });
    });

    describe("Test 12 Check getQueryParams function work flow", function () {
        it('QueryString will be blank', function () {
            var output = getQueryParams('');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });

        it('Test 13 When QueryString "?" should be blank', function () {
            var output = getQueryParams('?');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });

        it('Test 14 When QueryString "?utm_campaign=AQWE" should be return utm_campaign', function () {
            var output = getQueryParams('?utm_campaign=AQWE');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_campaign: 'AQWE'});
        });

        it('Test 15 When QueryString "?utm_medium=ampush" should be utm_medium', function () {
            var output = getQueryParams('?utm_medium=ampush');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_medium: 'ampush'});
        });
        it('Test 16 When QueryString "?utm_source=ampush" should be utm_source', function () {
            var output = getQueryParams('?utm_source=ampush');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_source: 'ampush'});
        });
        it('Test 17 When QueryString "?utm_source=" should be blank', function () {
            var output = getQueryParams('?utm_source=');
            expect(output).to.be.an('object');
            expect(output).to.eql({utm_source: ''});
        });
        it('Test 18 When QueryString "?utm_source" should be blank', function () {
            var output = getQueryParams('?utm_source');
            expect(output).to.be.an('object');
            expect(output).to.be.empty;
        });
    });

    describe("Test 19 Fire ABalytics.generateToken get results", function () {
        it('Call ABalytics.generateToken success', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', {"status": true, "message": "Already saved!", "amp_id": "68ba126472fa2d9a8bb75a848dbd29cd"});
            ABalytics.generateToken();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
        it('Call ABalytics.generateToken success status false', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', {"status": false});
            ABalytics.generateToken();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
        it('Test 20 Call ABalytics.generateToken Failure', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('error');
            ABalytics.generateToken();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
    })

    describe("Check Switch condition based upon Varient ID", function () {
        it('Test 21 variantID=0 means A', function () {
            ABalytics.variantId = 0;
            ABalytics.applyHtml();
            expect({}).to.be.empty;
        });
    });

    describe("Check Ratios based upon utm_medium", function () {
        this.timeout(25000);
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "brand"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=brand';
            ABalytics.init();
        });
        // remove the html fixture from the DOM
        afterEach(function () {
            fixture.cleanup();
        });
        it("Test 28 TestConfig Variable should have variants as given Respectively where utm_medium == brand", function () {
            //=====desktop brand
            expect(testConfig).to.have.property('q')
            expect(testConfig['q']).to.have.deep.property('min', 1)
            expect(testConfig['q']).to.have.deep.property('max', 100)
            expect(testConfig['q']).to.have.deep.property('variant_id', 0)
        });

        it("Test 29 TestConfig Variable should have variants  Respectively where Mobile utm_medium == brand", function () {
            //=======mobile brand
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            window.md = new MobileDetect('Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176');
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "brand"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=brand';
            ABalytics.init();
            expect(testConfig).to.have.property('q')
            expect(testConfig['q']).to.have.deep.property('min', 1)
            expect(testConfig['q']).to.have.deep.property('max', 100)
            expect(testConfig['q']).to.have.deep.property('variant_id', 0)
        });

        it("Test 29-1 TestConfig Variable should have variants Respectively where Mobile utm_medium == brand", function () {
            //=======mobile other
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            window.md = new MobileDetect('Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176');
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "other"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=other';
            ABalytics.init();
            expect(testConfig).to.have.property('q')
            expect(testConfig['q']).to.have.deep.property('min', 1)
            expect(testConfig['q']).to.have.deep.property('max', 100)
            expect(testConfig['q']).to.have.deep.property('variant_id', 0)
        });

        it('Test 30 Handle when utm_medium="" pass from querystring', function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: ""};

            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=';
            ABalytics.init();
            console.log("ABalytics.utm_medium" + ABalytics.utm_medium);
            expect(ABalytics.utm_medium).equal('other')
        })
    });

    describe("All Anchor Tags Start from *.stitchfix.com have 3 utm params ->>", function () {

        this.timeout(25000);
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "testamp"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=testamp';
            ABalytics.init();
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");

        });
        // remove the html fixture from the DOM
        after(function () {
            fixture.cleanup();
        });

        it("Test 31 All Anchor tags containg utm_content", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
                for (var x in testAllowedParams) {
                    if (isStyle !== -1) {
                        if (testAllowedParams[x] == 'utm_campaign') {
                            testParam = testAllowedParams[x] + '=' + utmID;
                        } else {
                            testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        }

                        var testAnchor = $(this).attr("href").indexOf(testParam);
                    } else {
                        testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                        var testAnchor = $(this).attr("href").indexOf(testParam);
                    }
                    if (testAnchor === -1) {
                        console.log(this);
                    }
                    expect(testAnchor).to.be.above(-1);
                }
            });
        });

        it('Test 32 All form Action containg "utm_source", "utm_medium", "utm_campaign"', function () {
            $('form').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("action");
                for (var x in testAllowedParams) {
                    testParam = testAllowedParams[x] + '=' + $.QueryString[testAllowedParams[x]];
                    var testAnchor = samepage.indexOf(testParam);
                    if (testAnchor === -1) {
                        console.log(this);
                    }
                    expect(testAnchor).to.be.above(-1);
                }
            });
        });
    });
     describe("Test Cases for Experimenter calls", function () {
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.home4.html'];
            }
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=other';
            setUtmParams("606c8fcd3f335868a48b64f5e63fdab9");
            ABalytics.init();
        });
        it("Test 33 for Checking experimenter calls", function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('success', ["https://style.stitchfix.com/stage/f.html"]);
            ABalytics.getExperimenterVariant();
            post.restore();
            done();
        })
        it('Test 34 Call experimenter Failure', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('error');
            ABalytics.getExperimenterVariant();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
        it('Test 35 Call updateExperimenterResponse Failure', function (done) {
            var post = sinon.stub($, 'ajax');
            post.yieldsTo('error');
            ABalytics.updateExperimenterResponse();
            expect(post.called).to.equal(true);
            expect(post.callCount).to.equal(1);
            post.restore();
            done();
        });
    })
});
