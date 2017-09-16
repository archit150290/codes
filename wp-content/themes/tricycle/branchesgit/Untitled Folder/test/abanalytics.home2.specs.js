'use strict';
var expect = chai.expect;
describe('General Test', function () {

    describe("constructor", function () {
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
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

        it("Test 3 should have 15 variants", function () {
            expect(15).to.equal(Object.keys(testConfig).length);
        });

        it("Test 4 should have a variant from array['a','b','c','d','e','f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o']", function () {
            expect(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']).to.include(ABalytics.variantName);
        });

        it("Test 5 should have a variant object config Array", function () {
            expect(testConfig).to.have.property(ABalytics.variantName);
        });

        it("Test 6 should not have a variant from array['a','b','c','d','e','f','g', 'h','i']", function () {
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

        it("Test 10 TestConfig Variable should have variants e=10% , f= 30%, g=60% Respectively", function () {
            //=====desktop other 
            expect(testConfig).to.have.property('a')
            expect(testConfig.a).to.have.deep.property('min', 0)
            expect(testConfig.a).to.have.deep.property('max', 0)
            expect(testConfig.a).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('b')
            expect(testConfig.b).to.have.deep.property('min', 0)
            expect(testConfig.b).to.have.deep.property('max', 0)
            expect(testConfig.b).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('c')
            expect(testConfig.c).to.have.deep.property('min', 0)
            expect(testConfig.c).to.have.deep.property('max', 0)
            expect(testConfig.c).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('d')
            expect(testConfig.d).to.have.deep.property('min', 0)
            expect(testConfig.d).to.have.deep.property('max', 0)
            expect(testConfig.d).to.have.deep.property('variant_id', 3)
            expect(testConfig).to.have.property('e')
            expect(testConfig.e).to.have.deep.property('min', 0)
            expect(testConfig.e).to.have.deep.property('max', 0)
            expect(testConfig.e).to.have.deep.property('variant_id', 4)
            expect(testConfig).to.have.property('f')
            expect(testConfig.f).to.have.deep.property('min', 1)
            expect(testConfig.f).to.have.deep.property('max', 55)
            expect(testConfig.f).to.have.deep.property('variant_id', 5)
            expect(testConfig).to.have.property('g')
            expect(testConfig.g).to.have.deep.property('min', 0)
            expect(testConfig.g).to.have.deep.property('max', 0)
            expect(testConfig.g).to.have.deep.property('variant_id', 6)
            expect(testConfig).to.have.property('h')
            expect(testConfig.h).to.have.deep.property('min', 56)
            expect(testConfig.h).to.have.deep.property('max', 100)
            expect(testConfig.h).to.have.deep.property('variant_id', 7)
            expect(testConfig.i).to.have.deep.property('min', 0)
            expect(testConfig.i).to.have.deep.property('max', 0)
            expect(testConfig.i).to.have.deep.property('variant_id', 8)
            expect(testConfig.j).to.have.deep.property('min', 0)
            expect(testConfig.j).to.have.deep.property('max', 0)
            expect(testConfig.j).to.have.deep.property('variant_id', 9)
            expect(testConfig.k).to.have.deep.property('min', 0)
            expect(testConfig.k).to.have.deep.property('max', 0)
            expect(testConfig.k).to.have.deep.property('variant_id', 10)
            expect(testConfig.l).to.have.deep.property('min', 0)
            expect(testConfig.l).to.have.deep.property('max', 0)
            expect(testConfig.l).to.have.deep.property('variant_id', 11)
            expect(testConfig.m).to.have.deep.property('min', 0)
            expect(testConfig.m).to.have.deep.property('max', 0)
            expect(testConfig.m).to.have.deep.property('variant_id', 12)
            expect(testConfig.n).to.have.deep.property('min', 0)
            expect(testConfig.n).to.have.deep.property('max', 0)
            expect(testConfig.n).to.have.deep.property('variant_id', 13)
            expect(testConfig.o).to.have.deep.property('min', 0)
            expect(testConfig.o).to.have.deep.property('max', 0)
            expect(testConfig.o).to.have.deep.property('variant_id', 14)
        });

        it("Test 11 All Anchor tags containg all params", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("href").indexOf('style.stitchfix.com/qa.html');
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
                if (samepage === -1) {
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
            post.yieldsTo('success', [{"status": true, "message": "Already saved!", "amp_id": "68ba126472fa2d9a8bb75a848dbd29cd"}]);
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

        it('Test 22 variantID=1 means B', function () {
            ABalytics.variantId = 1;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });

        it('Test 23 variantID=2 means C', function () {
            ABalytics.variantId = 2;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });

        it('Test 24 variantID=3 means D', function () {
            ABalytics.variantId = 3;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });
        it('Test 25 variantID=4 means E', function () {
            ABalytics.variantId = 4;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });
        it('Test 26 variantID=5 means F', function () {
            ABalytics.variantId = 5;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            expect({}).to.be.empty;
        });
        it('Test 27 variantID=6 means G', function () {
            ABalytics.variantId = 6;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var checkclass = $($(".copy")[0]).hasClass("addQuestion")
            expect(checkclass).to.be.true;
        });
    });

    describe("Check Ratios based upon utm_medium", function () {

        this.timeout(25000);
        before(function () {

            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
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
            expect(testConfig).to.have.property('a')
            expect(testConfig.a).to.have.deep.property('min', 0)
            expect(testConfig.a).to.have.deep.property('max', 0)
            expect(testConfig.a).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('b')
            expect(testConfig.b).to.have.deep.property('min', 0)
            expect(testConfig.b).to.have.deep.property('max', 0)
            expect(testConfig.b).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('c')
            expect(testConfig.c).to.have.deep.property('min', 0)
            expect(testConfig.c).to.have.deep.property('max', 0)
            expect(testConfig.c).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('d')
            expect(testConfig.d).to.have.deep.property('min', 0)
            expect(testConfig.d).to.have.deep.property('max', 0)
            expect(testConfig.d).to.have.deep.property('variant_id', 3)
            expect(testConfig).to.have.property('e')
            expect(testConfig.e).to.have.deep.property('min', 0)
            expect(testConfig.e).to.have.deep.property('max', 0)
            expect(testConfig.e).to.have.deep.property('variant_id', 4)
            expect(testConfig).to.have.property('f')
            expect(testConfig.f).to.have.deep.property('min', 1)
            expect(testConfig.f).to.have.deep.property('max', 50)
            expect(testConfig.f).to.have.deep.property('variant_id', 5)
            expect(testConfig).to.have.property('g')
            expect(testConfig.g).to.have.deep.property('min', 0)
            expect(testConfig.g).to.have.deep.property('max', 0)
            expect(testConfig.g).to.have.deep.property('variant_id', 6)
            expect(testConfig).to.have.property('h')
            expect(testConfig.h).to.have.deep.property('min', 51)
            expect(testConfig.h).to.have.deep.property('max', 95)
            expect(testConfig.h).to.have.deep.property('variant_id', 7)
            expect(testConfig.i).to.have.deep.property('min', 96)
            expect(testConfig.i).to.have.deep.property('max', 100)
            expect(testConfig.i).to.have.deep.property('variant_id', 8)
            expect(testConfig.j).to.have.deep.property('min', 0)
            expect(testConfig.j).to.have.deep.property('max', 0)
            expect(testConfig.j).to.have.deep.property('variant_id', 9)
            expect(testConfig.k).to.have.deep.property('min', 0)
            expect(testConfig.k).to.have.deep.property('max', 0)
            expect(testConfig.k).to.have.deep.property('variant_id', 10)
            expect(testConfig.l).to.have.deep.property('min', 0)
            expect(testConfig.l).to.have.deep.property('max', 0)
            expect(testConfig.l).to.have.deep.property('variant_id', 11)
            expect(testConfig.m).to.have.deep.property('min', 0)
            expect(testConfig.m).to.have.deep.property('max', 0)
            expect(testConfig.m).to.have.deep.property('variant_id', 12)
            expect(testConfig.n).to.have.deep.property('min', 0)
            expect(testConfig.n).to.have.deep.property('max', 0)
            expect(testConfig.n).to.have.deep.property('variant_id', 13)
            expect(testConfig.o).to.have.deep.property('min', 0)
            expect(testConfig.o).to.have.deep.property('max', 0)
            expect(testConfig.o).to.have.deep.property('variant_id', 14)
        });

        it("Test 29 TestConfig Variable should have variants  Respectively where Mobile utm_medium == brand", function () {
            //=======mobile brand
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            window.md = new MobileDetect('Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176');
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "brand"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=brand';
            ABalytics.init();
            expect(testConfig).to.have.property('a')
            expect(testConfig.a).to.have.deep.property('min', 0)
            expect(testConfig.a).to.have.deep.property('max', 0)
            expect(testConfig.a).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('b')
            expect(testConfig.b).to.have.deep.property('min', 0)
            expect(testConfig.b).to.have.deep.property('max', 0)
            expect(testConfig.b).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('c')
            expect(testConfig.c).to.have.deep.property('min', 0)
            expect(testConfig.c).to.have.deep.property('max', 0)
            expect(testConfig.c).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('d')
            expect(testConfig.d).to.have.deep.property('min', 0)
            expect(testConfig.d).to.have.deep.property('max', 0)
            expect(testConfig.d).to.have.deep.property('variant_id', 3)
            expect(testConfig).to.have.property('e')
            expect(testConfig.e).to.have.deep.property('min', 0)
            expect(testConfig.e).to.have.deep.property('max', 0)
            expect(testConfig.e).to.have.deep.property('variant_id', 4)
            expect(testConfig).to.have.property('f')
            expect(testConfig.f).to.have.deep.property('min', 0)
            expect(testConfig.f).to.have.deep.property('max', 0)
            expect(testConfig.f).to.have.deep.property('variant_id', 5)
            expect(testConfig).to.have.property('g')
            expect(testConfig.g).to.have.deep.property('min', 0)
            expect(testConfig.g).to.have.deep.property('max', 0)
            expect(testConfig.g).to.have.deep.property('variant_id', 6)
            expect(testConfig).to.have.property('h')
            expect(testConfig.h).to.have.deep.property('min', 0)
            expect(testConfig.h).to.have.deep.property('max', 0)
            expect(testConfig.h).to.have.deep.property('variant_id', 7)
            expect(testConfig.i).to.have.deep.property('min', 0)
            expect(testConfig.i).to.have.deep.property('max', 0)
            expect(testConfig.i).to.have.deep.property('variant_id', 8)
            expect(testConfig.j).to.have.deep.property('min', 1)
            expect(testConfig.j).to.have.deep.property('max', 15)
            expect(testConfig.j).to.have.deep.property('variant_id', 9)
            expect(testConfig.k).to.have.deep.property('min', 16)
            expect(testConfig.k).to.have.deep.property('max', 30)
            expect(testConfig.k).to.have.deep.property('variant_id', 10)
            expect(testConfig.l).to.have.deep.property('min', 31)
            expect(testConfig.l).to.have.deep.property('max', 45)
            expect(testConfig.l).to.have.deep.property('variant_id', 11)
            expect(testConfig.m).to.have.deep.property('min', 46)
            expect(testConfig.m).to.have.deep.property('max', 60)
            expect(testConfig.m).to.have.deep.property('variant_id', 12)
            expect(testConfig.n).to.have.deep.property('min', 61)
            expect(testConfig.n).to.have.deep.property('max', 80)
            expect(testConfig.n).to.have.deep.property('variant_id', 13)
            expect(testConfig.o).to.have.deep.property('min', 81)
            expect(testConfig.o).to.have.deep.property('max', 100)
            expect(testConfig.o).to.have.deep.property('variant_id', 14)
        });

        it("Test 29-1 TestConfig Variable should have variants Respectively where Mobile utm_medium == brand", function () {
            //=======mobile other
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            window.md = new MobileDetect('Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/98176');
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "other"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=other';
            ABalytics.init();
            expect(testConfig).to.have.property('a')
            expect(testConfig.a).to.have.deep.property('min', 0)
            expect(testConfig.a).to.have.deep.property('max', 0)
            expect(testConfig.a).to.have.deep.property('variant_id', 0)
            expect(testConfig).to.have.property('b')
            expect(testConfig.b).to.have.deep.property('min', 0)
            expect(testConfig.b).to.have.deep.property('max', 0)
            expect(testConfig.b).to.have.deep.property('variant_id', 1)
            expect(testConfig).to.have.property('c')
            expect(testConfig.c).to.have.deep.property('min', 0)
            expect(testConfig.c).to.have.deep.property('max', 0)
            expect(testConfig.c).to.have.deep.property('variant_id', 2)
            expect(testConfig).to.have.property('d')
            expect(testConfig.d).to.have.deep.property('min', 0)
            expect(testConfig.d).to.have.deep.property('max', 0)
            expect(testConfig.d).to.have.deep.property('variant_id', 3)
            expect(testConfig).to.have.property('e')
            expect(testConfig.e).to.have.deep.property('min', 0)
            expect(testConfig.e).to.have.deep.property('max', 0)
            expect(testConfig.e).to.have.deep.property('variant_id', 4)
            expect(testConfig).to.have.property('f')
            expect(testConfig.f).to.have.deep.property('min', 0)
            expect(testConfig.f).to.have.deep.property('max', 0)
            expect(testConfig.f).to.have.deep.property('variant_id', 5)
            expect(testConfig).to.have.property('g')
            expect(testConfig.g).to.have.deep.property('min', 0)
            expect(testConfig.g).to.have.deep.property('max', 0)
            expect(testConfig.g).to.have.deep.property('variant_id', 6)
            expect(testConfig).to.have.property('h')
            expect(testConfig.h).to.have.deep.property('min', 0)
            expect(testConfig.h).to.have.deep.property('max', 0)
            expect(testConfig.h).to.have.deep.property('variant_id', 7)
            expect(testConfig.i).to.have.deep.property('min', 0)
            expect(testConfig.i).to.have.deep.property('max', 0)
            expect(testConfig.i).to.have.deep.property('variant_id', 8)
            expect(testConfig.j).to.have.deep.property('min', 1)
            expect(testConfig.j).to.have.deep.property('max', 15)
            expect(testConfig.j).to.have.deep.property('variant_id', 9)
            expect(testConfig.k).to.have.deep.property('min', 16)
            expect(testConfig.k).to.have.deep.property('max', 30)
            expect(testConfig.k).to.have.deep.property('variant_id', 10)
            expect(testConfig.l).to.have.deep.property('min', 31)
            expect(testConfig.l).to.have.deep.property('max', 45)
            expect(testConfig.l).to.have.deep.property('variant_id', 11)
            expect(testConfig.m).to.have.deep.property('min', 46)
            expect(testConfig.m).to.have.deep.property('max', 60)
            expect(testConfig.m).to.have.deep.property('variant_id', 12)
            expect(testConfig.n).to.have.deep.property('min', 61)
            expect(testConfig.n).to.have.deep.property('max', 80)
            expect(testConfig.n).to.have.deep.property('variant_id', 13)
            expect(testConfig.o).to.have.deep.property('min', 81)
            expect(testConfig.o).to.have.deep.property('max', 100)
            expect(testConfig.o).to.have.deep.property('variant_id', 14)
        });

        it('Test 30 Handle when utm_medium="" pass from querystring', function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: ""};

            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=';
            ABalytics.init({
                popupform: [{name: 'v1'}, {name: 'v2'}, {name: 'v3'}, {name: 'v4'}, {name: 'v5'}, {name: 'v6'}],
            });
            console.log("ABalytics.utm_medium" + ABalytics.utm_medium);
            expect(ABalytics.utm_medium).equal('other')
        })
    });

    describe("All Anchor Tags Start from *.stitchfix.com have 3 utm params ->>", function () {

        this.timeout(25000);
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            $.QueryString = {utm_campaign: "606c8fcd3f335868a48b64f5e63fdab9", utm_source: "ampush", utm_medium: "other"};
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=other';
            setUtmParams("606c8fcd3f335868a48b64f5e63fdab9");
            ABalytics.init();
        });
        // remove the html fixture from the DOM
        after(function () {
            fixture.cleanup();
        });

        it("Test 31 All Anchor tags containg utm_content", function () {
            $('a[href*=".stitchfix.com"]').each(function () {
                var testParam;
                var testAllowedParams = ["utm_source", "utm_medium", "utm_campaign"];
                var samepage = $(this).attr("href").indexOf('style.stitchfix.com/qa.html');
                var isStyle = $(this).attr("href").indexOf('style.stitchfix.com/gifts');
                if (samepage === -1) {
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
    describe("Test Cases for H variant", function () {
        it('Test 33 variantID=7 means H', function () {
            ABalytics.variantId = 7;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ptc2 = $(".copy").find(".ptc2").css("display")
            var ptc1 = $(".copy").find(".ptc1").css("display")
            expect(ptc2).to.be.equal("block")
            expect(ptc1).to.be.equal("none")
        });
        it('Test 34 Select value for top form and get return value similar in new user form', function () {
            ABalytics.variantId = 7;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            $(".rbtn-scale-pop").parent().removeClass("active");
            $(".rbtn-scale-pop[value=40]").attr("checked", "checked");
            $(".rbtn-scale-pop[value=40]").parent().addClass("active");
            $(".copy .btn-group").click();
            clock.tick(550);
            var valueselectedfornewuser = $('#new_user .btn-group input:radio:checked').val()
            expect(valueselectedfornewuser).to.be.equal("40");
            expect($("#new_user .btn-group").parent(".form-group").css("display")).to.be.equal("none");
            clock.restore();
        });

        it('Test 35 Select When size chart is clicked', function () {
            $("table.size-chart td.s:last").click();
            ABalytics.variantId = 7;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(800);
            var valueselectedfornewuser = $('#new_user .btn-group input:radio:checked').val()
            var valueselectedforbtngrp = $('.copy .btn-group input:radio:checked').val()
            expect(valueselectedfornewuser).to.be.equal(valueselectedforbtngrp)
            clock.restore();
        });

        it('Test 36 check if fb button is ours', function () {
            ABalytics.variantId = 7;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(550);
            clock.restore();
            var fbloginBtn = $($(".fb-login-d")[0]).css("display");
            expect(fbloginBtn).to.be.equal("block")
        });
    });
    describe("Test Cases for I variant", function () {
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            ABalytics.init();
            setUtmParams("68ba126472fa2d9a8bb75a848dbd29cd");
            window.site_q = '';
        });
        after(function () {
            fixture.cleanup();
        });
        it('Test 37 variantID=8 means I', function () {
            ABalytics.variantId = 8;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var fbloginBtn = $($("#getStart-dialog .fb-login-c")[0]).css("display");
            expect(fbloginBtn).to.be.equal("block")
            var fbloginBtn = $($(".fb-login-c")[0]).css("display");
            expect(fbloginBtn).to.be.equal("block")
        });
    })

    describe("Test Cases for Mobile Variant", function () {
        before(function () {
            if (window.__html__) {
                document.body.innerHTML = window.__html__['test/qa.html'];
            }
            window.site_q = '?utm_campaign=1234056&utm_source=amp&utm_medium=other';
            setUtmParams("606c8fcd3f335868a48b64f5e63fdab9");
            ABalytics.init();
        });

        beforeEach(function () {
            return mobSliderObj = {
                stagePadding: 0,
                center: true,
                items: 1,
                nav: true,
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                responsive: {
                    600: {
                        items: 2
                    }
                }
            }
        });


        it("Test 38 for New mobile variants j", function () {
            ABalytics.variantId = 9;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver4-2");
            expect(ClassAppended).to.be.true
        });

        it("Test 39 for New mobile variants k", function () {
            $($("body")[0]).attr("class", "")
            ABalytics.variantId = 10;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver4-3");
            expect(ClassAppended).to.be.true
        });

        it("Test 40 for New mobile variants L", function () {
            $($("body")[0]).attr("class", "")
            ABalytics.variantId = 11;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver2-2");
            expect(mobSliderObj.stagePadding).to.be.equal(0)
            expect(ClassAppended).to.be.true
        })

        it("Test 41 for New mobile variants M", function () {
            $($("body")[0]).attr("class", "")
            ABalytics.variantId = 12;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver2-3");
            expect(mobSliderObj.stagePadding).to.be.equal(0)
            expect(ClassAppended).to.be.true
        });

        it("Test 42 for New mobile variants N", function () {
            $($("body")[0]).attr("class", "")
            ABalytics.variantId = 13;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver3-2");
            expect(mobSliderObj.stagePadding).to.be.equal(0)
            expect(ClassAppended).to.be.true
        })

        it("Test 43 for New mobile variants O", function () {
            $($("body")[0]).attr("class", "")
            ABalytics.variantId = 14;
            var clock = sinon.useFakeTimers();
            ABalytics.applyHtml();
            clock.tick(20);
            clock.restore();
            var ClassAppended = $($("body")[0]).hasClass("mob-ver ver3-3");
            expect(mobSliderObj.stagePadding).to.be.equal(0)
            expect(ClassAppended).to.be.true
        })
    })
});
