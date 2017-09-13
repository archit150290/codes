let $ = require('jquery');
window.jQuery = window.$ = $;

var settings = {};
var abanalytics = {};

settings.apiURL = "https://ampid.ampush.io";
settings.defaultUtmToken = "amp_kOOYb-7M_lKzAES5TyStJA";
settings.defaultCamId = "111111222222";
settings.defaultSource = "ampush";
settings.defaultMedium = "prospecting";
settings.allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_creative", "utm_content", "utm_site"];
settings.ignoreDomain = ['stitchfix.com'];
settings.exUrlClass = "a.trackClass, a.site-nav__link, a.button, .sub-table a, .wrapper .cf a, .site-nav--mobile a";
settings.apiAccessToken = "b182f027115663f7a5a790b609f61447";
settings.client = "hubble";
settings.allowedSource = ["ampush", "insiderenvy"];
settings.allowedMedium = ["prospecting", "retargeting", "insiderenvy", "test", "taboolaoutbrain", "TaboolaOutbrain","other","Other"];
settings.specialParams = '7fh285_';
settings.hcExpURL = 'https://experimenter.ampush.io/experimenter';
settings.hcExpClass = '.subscribe-page';
settings.fullstoryfs = 'fullstory_integration';
var site_q = window.location.search;
var utmToken = settings.defaultUtmToken;
var FSstart = false;
var getCookie = function getCookie(t) {
    for (var n = t + "=", r = document.cookie.split(";"), e = 0; e < r.length; e++) {
        for (var i = r[e];
            " " == i.charAt(0);)
            i = i.substring(1);
        if (0 == i.indexOf(n))
            return i.substring(n.length, i.length)
    }
    return ""
}

function getQueryParams(e) {
    var r = e.split("?"),
        t = "";
    if (2 == r.length && (t = r[1], t = t.split("&")), "" == t)
        return {};
    for (var n = {}, i = 0; i < t.length; ++i) {
        var a = t[i].split("=");
        2 == a.length && (n[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")))
    }
    return n
}


abanalytics.addQueryToAnchors = function(m_params) {
    $(settings.exUrlClass).each(function() {
        var tUrl = $(this).attr("href");
        if (tUrl != "javascript:void(0);" && typeof tUrl != "undefined") {
            tUrl = tUrl.split("?")[0];
            var offset = "";
            if (tUrl.search("#") >= 0) {
                var tUrls = tUrl.split("#");
                tUrl = tUrls[0];
                offset = tUrls.length > 1 ? "#" + tUrls[1] : '#';
            }
            var q = site_q;

            var q_params = getQueryParams(site_q);
            if(typeof m_params != 'undefined' && m_params){
                var ck_params = m_params;
            }else{
                var ck_params = getCookie("utm_params");
            }
            ck_params = ck_params != "" ? JSON.parse(ck_params) : {};
            var q_params = ck_params;
            if (!("utm_campaign" in q_params) || q_params["utm_campaign"] == "") {
                q_params["utm_campaign"] = ck_params["utm_campaign"] || settings.defaultCamId;
            }
            if (!("utm_medium" in q_params) || q_params["utm_medium"] == "") {
                q_params["utm_medium"] = ck_params["utm_medium"] || settings.defaultMedium;
            }
            if (!("utm_source" in q_params) || q_params["utm_source"] == "") {
                q_params["utm_source"] = ck_params["utm_source"] || settings.defaultSource;
            }
            var allowedParams = settings.allowedParams;
            if(tUrl !='' && tUrl.search('http') != -1 && tUrl.search('https://hello.hubblecontacts.com') != 0){
                for (var x in q_params) {
                    if ($.inArray(x, allowedParams) < 0) {
                        delete q_params[x];   
                    }
                }
            }else{
                for (var x in q_params) {
                    if ($.inArray(x, allowedParams) < 0) {
                        if(x !='' && x.search(settings.specialParams) != 0){
                            delete q_params[x];   
                        }
                    }
                }
            }
            q = "?" + $.param(q_params);
            tUrl = tUrl + q + offset;
            $(this).attr("href", tUrl);
        }
    });
}
abanalytics.setUtmParams = function(getReturn, utmToken) {
    var queryParams = getQueryParams(site_q);
    var c_params = getCookie("utm_params");
    c_params = c_params != "" ? JSON.parse(c_params) : {};
    var utm_campaign = "";
    if (typeof utmToken != 'undefined' && utmToken) {
        utm_campaign = utmToken;
    } else if ("utm_campaign" in queryParams) {
        utm_campaign = queryParams['utm_campaign'] || c_params["utm_campaign"] || settings.defaultUtmToken;
    } else {
        if ("utm_campaign" in c_params) {
            utm_campaign = c_params["utm_campaign"];
        } else {
            utm_campaign = settings.defaultUtmToken;
        }
    }
    for (var x in c_params) {
        if (!(x in queryParams)) {
            queryParams[x] = c_params[x];
        }
    }
    queryParams["utm_campaign"] = utm_campaign;
    var allowedParams = settings.allowedParams;
    for (var x in queryParams) {
        if ($.inArray(x, allowedParams) < 0) {
            if(x !='' && x.search(settings.specialParams) != 0){
                delete queryParams[x];   
            }
        }
    }
    var allowedSource = settings.allowedSource;
    if ($.inArray(queryParams['utm_source'], allowedSource) < 0) {
        if (typeof c_params['utm_source'] != 'undefined' && c_params['utm_source']) {
            if ($.inArray(c_params['utm_source'], allowedSource) < 0) {
                queryParams['utm_source'] = settings.defaultSource;
            } else {
                queryParams['utm_source'] = c_params['utm_source'];
            }
        } else {
            queryParams['utm_source'] = settings.defaultSource;
        }
    }

    var allowedMedium = settings.allowedMedium;
    if ($.inArray(queryParams['utm_medium'], allowedMedium) < 0) {
        if (typeof c_params['utm_medium'] != 'undefined' && c_params['utm_medium']) {
            if ($.inArray(c_params['utm_medium'], allowedMedium) < 0) {
                queryParams['utm_medium'] = settings.defaultMedium;
            } else {
                queryParams['utm_medium'] = c_params['utm_medium'];
            }
        } else {
            queryParams['utm_medium'] = settings.defaultMedium;
        }
    }

    if (typeof queryParams['utm_creative'] !='undefined' && queryParams['utm_creative'].trim() == '') {
        if (typeof c_params['utm_creative'] != 'undefined' && c_params['utm_creative']) {
            if (c_params['utm_creative'].trim() == '') {
                delete queryParams['utm_creative'];
            } else {
                queryParams['utm_creative'] = c_params['utm_creative'];
            }
        } else {
            delete queryParams['utm_creative'];
        }
    }
    if (typeof queryParams['utm_site'] !='undefined' && queryParams['utm_site'].trim() == '') {
        if (typeof c_params['utm_site'] != 'undefined' && c_params['utm_site']) {
            if (c_params['utm_site'].trim() == '') {
                delete queryParams['utm_site'];
            } else {
                queryParams['utm_site'] = c_params['utm_site'];
            }
        } else {
            delete queryParams['utm_site'];
        }
    }
    if (typeof queryParams['utm_content'] !='undefined' && queryParams['utm_content'].trim() == '') {
        if (typeof c_params['utm_content'] != 'undefined' && c_params['utm_content']) {
            if (c_params['utm_content'].trim() == '') {
                delete queryParams['utm_content'];
            } else {
                queryParams['utm_content'] = c_params['utm_content'];
            }
        } else {
            delete queryParams['utm_content'];
        }
    }

    if (typeof getReturn != "undefined" && getReturn == "returnParams") {
       for (var x in queryParams) {
            if ($.inArray(x, allowedParams) < 0) {
                delete queryParams[x];   
            }
        }
       return "?" + $.param(queryParams);
    }else if(typeof getReturn != "undefined" && getReturn == "returnBrowserParams"){
        return "?" + $.param(queryParams);
    } else if (typeof getReturn != "undefined" && getReturn == "tracker") {
        return queryParams;
    } else {
        var m_params = $.extend(true, {}, queryParams);
        abanalytics.addQueryToAnchors(JSON.stringify(m_params));
        if(typeof callHcExp != 'undefined' && callHcExp && typeof getReturn != "undefined" && getReturn == "ampResponse"){
            abanalytics.hcExperimenter(JSON.stringify(m_params));
        }
        for (var x in queryParams) {
            if ($.inArray(x, allowedParams) < 0) {
                delete queryParams[x];   
            }
        }
        var c_params = $.extend(true, {}, queryParams);
        document.cookie = "utm_params=" + JSON.stringify(c_params) + ";path=/";
    }
}
abanalytics.generateToken = function() {
    var queryStr = abanalytics.setUtmParams('tracker', '');
    var utm_campaign = queryStr['utm_campaign'];

    if (utm_campaign == settings.defaultUtmToken) {
        utm_campaign = settings.defaultCamId;
    }
    //var targetURL = settings.apiURL + "/utmparams/generate" + queryStr + "&client="+settings.client+"&access_token="+settings.apiAccessToken;
    var targetURL = settings.apiURL + '/translate';
    //var targetURL = "http://ab.ampush.design/utmparams/generate";
    abanalytics.setUtmParams('', settings.defaultUtmToken);
    $.ajax({
        url: targetURL,
        "method": "post",
        data: { id: utm_campaign },
        success: function(result) {
            utmToken = result.amp_id;
            abanalytics.setUtmParams('ampResponse', utmToken);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            abanalytics.setUtmParams('ampResponse', utmToken);
        },
        complete: function(xhr, status) {
            setBrowserBar(utmToken);
        },
        timeout: 5000
    });

}


function setBrowserBar(utmToken) {
    var paths = window.location.pathname;
    var filename = paths.split("/").pop();
    var updatedpath = "";
    // if (filename.indexOf("index-") > -1 && filename != 'index-D.html' && filename != 'index-C.html')
    //     var updatedpath = "/";    
    if (typeof replaceState!="undefined" && replaceState == true)
        var updatedpath = "/";    
    var ParamsAppended = abanalytics.setUtmParams('returnBrowserParams', utmToken);
    history.replaceState({}, document.title, updatedpath + ParamsAppended);
    //=remove event fired
    //track.fireCustomPixel(utmToken);
    if (typeof fireOutbrain !== 'undefined' && $.isFunction(fireOutbrain)) {
        fireOutbrain(100); 
    }
}

$(document).ready(function() {
    if(getCookie('fullstory_funnel')){
        if(getCookie('fullstory_funnel') == 'yes')
            abanalytics.fullstory_init();
        else
            console.log("Full Story.X")
    }else if(typeof ExpPage!="undefined" && ExpPage == true){
        abanalytics.fullstoryintegration();
    }
    abanalytics.generateToken();
});


abanalytics.hcExperimenter = function(m_params) {
    if(typeof funnel_step_req_page == "undefined" || funnel_step_req_page == "")
        var funnel_step_req = 'subscribe_page';
    else
        var funnel_step_req = funnel_step_req_page;
    $.ajax({
        url: settings.hcExpURL,
        data: { partner_id: 'hubble', funnel_step: funnel_step_req },
        success: function(result) {
            if(typeof result.variant_url != 'undefined' && result.variant_url){
                $(settings.hcExpClass).attr('href',result.variant_url);
                abanalytics.addQueryToAnchors(m_params);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log('hcExperimenter error');  
        },
        complete: function(xhr, status) {
            console.log('hcExperimenter success'); 
        },
        timeout: 5000
    });
}

abanalytics.fullstoryintegration = function(){
    $.ajax({
        url: settings.hcExpURL,
        data: { partner_id: 'hubble', funnel_step: settings.fullstoryfs },
        success: function(result) {
            //result.variant_url = "true";
            if(typeof result.variant_url != 'undefined' && result.variant_url=="true"){
                FSstart = true;
                abanalytics.fullstory_init();
                document.cookie = "fullstory_funnel=yes;path=/";
                console.log('fullstory true');
            }else{
                document.cookie = "fullstory_funnel=no;path=/";
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            document.cookie = "fullstory_funnel=; expires=Thu, 18 Dec 2013 12:00:00 UTC;path=/";
            console.log('fullstory error');  
        },
        timeout: 5000
    });
}


abanalytics.fullstory_init = function(){
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_org'] = '70A6J';
    window['_fs_namespace'] = 'FS';
    (function(m,n,e,t,l,o,g,y){
        if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
        g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
        o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
        y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
        g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
        g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
        g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')){
        d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
        ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
    })(window,document,window['_fs_namespace'],'script','user');
}

module.exports = {
    abanalytics : abanalytics,
    getCookie : getCookie,
    utmToken : settings.defaultUtmToken
}

