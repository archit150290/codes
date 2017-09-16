var stitchfixUrl = 'https://www.stitchfix.com/';
var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
var utmToken = '';
var utmID = '';
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getQueryStr(objParams) {
    var paramArr = [];
    if (Object.keys(objParams).length) {
        for (var x in objParams) {
            paramArr.push(x + "=" + objParams[x]);
        }
    }
    return paramArr.join("&");
}
function getQueryParams(x) {
    var u = x.split("?");
    var a = "";
    if (u.length == 2) {
        a = u[1];
        a = a.split('&');
    }

    if (a == "")
        return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p = a[i].split('=');
        if (p.length != 2)
            continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
function addQueryToAnchors() {
    var q_params = urldetails = {};
    var urldetails = (document.referrer != '') ? parseURL(document.referrer) : '' ;
        //console.log(urldetails);
    
    var qa = $.QueryString;
    //console.log(qa);
    //console.log(qa.utm_source);
    //console.log(qa.utm_medium);
    if( typeof qa.utm_source != 'undefined' && qa.utm_source != '' ){
        q_params["utm_source"] = qa.utm_source;
    }else if( typeof urldetails.host == 'undefined' ){
        q_params["utm_source"] = "lptorganic";
    }else{
        q_params["utm_source"] = urldetails.host;    
    }

    if( typeof qa.utm_medium != 'undefined' && qa.utm_medium != '' ){
        q_params["utm_medium"] = qa.utm_medium;
    }else{
        q_params["utm_medium"] = 'organic';
    }

    q_params["utm_campaign"] = 'organic';

    var q = '';
    $('a[href*=".stitchfix.com"]').each(function () {
        var tUrl = $(this).attr("href");
        var isStyleDomain = tUrl.search("style.stitchfix") >= 0 ? true : false;

        var offset = "";
        if (tUrl.search("#") >= 0) {
            var tUrls = tUrl.split("#");
            tUrl = tUrls[0];
            offset = tUrls.length > 1 ? "#" + tUrls[1] : '#';
        }

        q = "?" + getQueryStr(q_params);
        tUrl = tUrl + q + offset;
        $(this).attr("href", tUrl);
        
    });
    var url = $("#new_user").attr("action") + q ;
    $("#new_user").attr("action", url);
    $("#new_user_pop").attr("action", url);
}

function parseURL(url){
    parsed_url = {}

    if ( url == null || url.length == 0 )
        return parsed_url;

    protocol_i = url.indexOf('://');
    parsed_url.protocol = url.substr(0,protocol_i);

    remaining_url = url.substr(protocol_i + 3, url.length);
    domain_i = remaining_url.indexOf('/');
    domain_i = domain_i == -1 ? remaining_url.length - 1 : domain_i;
    parsed_url.domain = remaining_url.substr(0, domain_i);
    parsed_url.path = domain_i == -1 || domain_i + 1 == remaining_url.length ? null : remaining_url.substr(domain_i + 1, remaining_url.length);

    domain_parts = parsed_url.domain.split('.');
    switch ( domain_parts.length ){
        case 2:
          parsed_url.subdomain = null;
          parsed_url.host = domain_parts[0];
          parsed_url.tld = domain_parts[1];
          break;
        case 3:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2];
          break;
        case 4:
          parsed_url.subdomain = domain_parts[0];
          parsed_url.host = domain_parts[1];
          parsed_url.tld = domain_parts[2] + '.' + domain_parts[3];
          break;
    }

    parsed_url.parent_domain = parsed_url.host + '.' + parsed_url.tld;

    return parsed_url;
}

(function ($) {
    $.QueryString = (function (a) {
        if (a == "")
            return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p = a[i].split('=');
            if (p.length != 2)
                continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

$(document).ready(function () {
    addQueryToAnchors(); 
});
