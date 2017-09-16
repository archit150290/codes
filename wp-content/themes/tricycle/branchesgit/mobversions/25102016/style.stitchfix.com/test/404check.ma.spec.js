/**
 * This casper unit test script checks for 404 internal links for a given root url.
 *
 *
 *     $ casperjs test 404checker.spec.js
 */

var url = "https://style.stitchfix.com/stage20160822/about1";
var checked = [];
var dead = [];
var currentLink = 0;
var fs = require('fs');
var upTo = 0;
var baseUrl = url;
var utils = require('utils');
var f = utils.format;
var test;
var links = fs.read('test/Links-ma.log').split('\n');
upTo = links.length;


// Opens the page, perform tests and fetch next links
function crawl(link) {
    this.start().then(function() {
        this.echo(link, 'COMMENT');
        this.open(link);
        checked.push(link);
    });
    this.then(function() {
        test.assertNotEquals(this.currentHTTPStatus, 404, link + ' is missing (HTTP 404)');
        test.assertNotEquals(this.currentHTTPStatus, 500, link + ' is broken (HTTP 500)');

        if (this.currentHTTPStatus === 404) {
            casper.log(link + ' is missing (HTTP 404)', 'warn');
	        dead.push(link);
        } else if (this.currentHTTPStatus === 500) {
            casper.log(link + ' is broken (HTTP 500)', 'warn');
	        dead.push(link);
        } else {
            casper.log(link + f(' is okay (HTTP %s)', this.currentHTTPStatus), 'debug');
        }
    });
}

// As long as it has a next link, and is under the maximum limit, will keep running
function check() {
    if (links[currentLink] && currentLink < upTo) {
        crawl.call(this, links[currentLink]);
        currentLink++;
        this.run(check);
    } else {
        casper.log("All done, " + checked.length + " links checked.", 'debug');
        test.done();
    }
}


casper.test.begin('Check links', function suite(t) {
    casper.start().then(function() {
        this.echo("Starting");
        test = t;
    }).run(check);
});
