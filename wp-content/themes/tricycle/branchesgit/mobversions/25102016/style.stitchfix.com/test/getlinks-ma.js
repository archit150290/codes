var casper = require('casper').create({
    loadImages: false,
});
var url = '';
var baseUrl = url;
var links = [];
var fs = require('fs');
// Opens casperjs homepage
casper.start('https://style.stitchfix.com/stage/20160822/about1');

function getLinks() {
// Scrape the links from top-right nav of the website
    var links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function (e) {
        item = e.getAttribute('href');
        if(item != 'javascript:void(0)' && item != 'javascript:void(0);' && item != '#' && item != '/') {
        return e.getAttribute('href')
        }else{
            return [];
        }
    });
}

var temp = [];
casper.then(function () {
    temp = this.evaluate(getLinks);
    for(var i in temp) {
        if(temp[i] != '' || typeof temp[i] != 'object'){
            links.push(temp[i])
        }
    }
    var uniqueArray = function(array) {
        var x,
        len=array.length,
        out=[],
        obj={};
        var temp=0;
        for (x=0; x<len; x++) {
            var check = array[x].trim();
            if( check != '' && typeof obj[check] === 'undefined' ){
                obj[check]=temp;
                temp++;
            }
        }
        for (x in obj) {
            out[obj[x]]=x;
        }
        return out;
    }
    links = uniqueArray(links);
if (links.length > 0) {
    if (fs.exists("test/Links-ma.log"))
	 fs.remove("test/Links-ma.log");
    fs.write("test/Links-ma.log", links.join("\n"));
}
    
});
casper.run();
