var site_url = window.location.toString();
var site_q = window.location.search;
var stitchfixUrl = 'https://www.stitchfix.com/';
var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id"];
var utmToken = '';
var utmID = '';
var defaultUtmToken = '68ba126472fa2d9a8bb75a848dbd29cd';
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
    $('a[href*=".stitchfix.com"]').each(function () {
        var tUrl = $(this).attr("href");
        var isStyleDomain = tUrl.search("style.stitchfix") >= 0 ? true : false;

        var offset = "";
        if (tUrl.search("#") >= 0) {
            var tUrls = tUrl.split("#");
            tUrl = tUrls[0];
            offset = tUrls.length > 1 ? "#" + tUrls[1] : '#';
        }
        var q = site_q;
        var q_params = getQueryParams(site_q);
        var q_params_org = $.extend(true, {}, q_params);
        var ck_params = getCookie("utm_params");
        ck_params = ck_params != "" ? JSON.parse(ck_params) : {};
        if (site_q == "" || site_q == "?" || !("utm_campaign" in q_params)) {

            if (Object.keys(ck_params).length) {
                q_params = $.extend(true, {}, ck_params);
                delete q_params["utm_id"];
            }
        }
        q_params["utm_source"] = "ampush";
        if (!isStyleDomain) {
            q_params["utm_campaign"] = utmToken;
        } else {
            q_params["utm_campaign"] = utmID;
            if ("utm_id" in ck_params && !("utm_campaign" in q_params_org)) {
                q_params["utm_campaign"] = ck_params["utm_id"];
            }
        }

        if (!("utm_medium" in q_params)) {
            q_params["utm_medium"] = 'other';
        }

        var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
        for (var x in q_params) {
            if ($.inArray(x, allowedParams) < 0) {
                delete q_params[x];
            }
        }
        //console.log(q_params);
        q = "?" + getQueryStr(q_params);
        tUrl = tUrl + q + offset;
        $(this).attr("href", tUrl);

    });
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

var apiURL = window.location.host == "localhost" ? "http://localhost:3000/" : "https://ab.ampush.design/";
//apiURL = "http://stage-stitchfix.us-west-1.elasticbeanstalk.com/";
var testCases = ["popupform"];
var testConfig = {};
var tc = "";

var ABalytics = (function (window, document, undefined) {
    /* exported ABalytics */

    // Returns a classic or universal analytics wrapper object
    var analyticsWrapper = function (ga, gaq) {

    };
    this.variantId = 0;
    this.variantName = "a";
    this.client = "";
    var getVariantId = function () {
        return this.variantId;
    };

    analyticsWrapper.prototype.push = function (experimentName, variantName, slot) {
    };

    var readCookie = function (name) {
        var nameEQ = name + '=',
                ca = document.cookie.split(';'),
                i,
                c;
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };
    var getElementsByClassName = function (className) {
        var hasClassName = new RegExp('(?:^|\\s)' + className + '(?:$|\\s)'),
                allElements = document.getElementsByTagName('*'),
                results = [],
                element,
                elementClass,
                i = 0;
        variantId = Math.floor(Math.random()) * 100;

        for (i = 0;
                ((element = allElements[i]) !== null) && (element !== undefined); i++) {
            elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) !== -1 && hasClassName.test(
                    elementClass)) {
                results.push(element);
            }
        }

        return results;
    };

    return {
        changes: [],
        // for each experiment, load a variant if already saved for this session, or pick a random one
        // slot can either be a dimension or a custom variable
        init: function (config, slot) {
            var gaWrapper = new analyticsWrapper(window.ga, window._gaq),
                    experiment,
                    variants,
                    variant,
                    variantId,
                    change;

            if (typeof (slot) === 'undefined') {
                slot = 1;
            }

            for (experiment in config) {
                variants = config[experiment];

                // read the saved variant for this experiment in this session, or pick a random one and save it
                variantId = readCookie('ABalytics_' + experiment);
                //if (!variantId || !variants[variantId]) {                 // pick a random variant
                var r = Math.random() * variants.length;
                r = Math.floor(r > 1 ? (r - 1) * 100 /10: r * 100);

                // mobile detaction
                if( md.mobile() != null ){
                    testConfig = {"a": {"min": 0, "max": 46, "variant_id": 0}, 
                                  "b": {"min": 47, "max": 96, "variant_id": 1},
                                  "c": {"min": 97, "max": 97, "variant_id": 2},
                                  "d": {"min": 98, "max": 98, "variant_id": 3},
                                  "e": {"min": 99, "max": 99, "variant_id": 4},
                                  "f": {"min": 100, "max": 100, "variant_id": 5},                                  
                                };
                }else{
                    testConfig = {"a": {"min": 0, "max": 46, "variant_id": 0}, 
                                  "b": {"min": 47, "max": 96, "variant_id": 1},
                                  "c": {"min": 97, "max": 97, "variant_id": 2},
                                  "d": {"min": 98, "max": 98, "variant_id": 3},
                                  "e": {"min": 99, "max": 99, "variant_id": 4},
                                  "f": {"min": 100, "max": 100, "variant_id": 5},                                  
                                };
                }

                variantId = getVariant(r, testConfig);
                //console.log(r + "-" + variantId);
                document.cookie = 'ABalytics_' + experiment + '=' + variantId + '; path=/';
                //} 
                variant = variants[variantId];
                this.variantId = variantId;
                gaWrapper.push(experiment, variant.name, slot);

                for (change in variant) {
                    if (change !== 'name') {
                        this.changes.push([change, variant[change]]);
                    }
                }
                slot++;
            }
        },
        // apply the selected variants for each experiment
        applyHtml: function () {
            switch (this.variantId) {
                case  0:

                    break;
                case  1:
                    ABalytics.paintOnLoad(".copy", function () {
                        $(".copy").addClass("addQuestion");
                    }, 20);
                    break;
                /*case  2:
                    ABalytics.paintOnLoad("body", function () {
                        $("body").attr('id', 'ver8');
                        $(".header-hide").hide();                        
                    }, 20);
                    break;
                case  3:
                    ABalytics.paintOnLoad("body", function () {
                        $("body").attr('id', 'ver9');
                        $(".header-hide").hide();
                    }, 20);
                    break;
                case  4:
                    ABalytics.paintOnLoad("body", function () {
                        $("body").attr('id', 'ver10');
                        $(".header-hide").hide();
                    }, 20);
                    break;
                case  5:
                    ABalytics.paintOnLoad("body", function () {
                        $("body").attr('id', 'ver11');
                        $(".header-hide").hide();
                    }, 20);
                    break;*/
            }
        }
    };
})(window, document);
ABalytics.paintOnLoad = function (selector, myFunction, intervalTime) {
    var interval = setInterval(function () {
        if ($(selector).length > 0) {
            myFunction();
            clearInterval(interval);
        }
    }, intervalTime);
}
ABalytics.getQueryString = function (objParams) {
    var queryParams = [], r = '';
    if (Object.keys(objParams).length) {
        for (var x in objParams) {
            queryParams[queryParams.length] = x + '=' + objParams[x];
        }
        r = queryParams.join("&");
        r = "?" + r;
    }
    return r;
}
ABalytics.generateToken = function () {
    var params = ["utm_campaign"];
    var queryParams = [];
    for (var x in params) {
        if (params[x] in $.QueryString) {
            queryParams[queryParams.length] = params[x] + '=' + $.QueryString[params[x]];
        }
    }
    if (queryParams.length == 0) {
        var c_params = getCookie("utm_params");
        if (c_params != "") {
            params = JSON.parse(c_params);
            delete params["utm_id"];
            for (var x in params) {
                queryParams[queryParams.length] = x + '=' + params[x];
            }
        }
    }
    if (queryParams.length === 0) {

        queryParams[0] = 'utm_campaign=' + dfutm_camid;
    }
    if (queryParams.length) {
        var queryStr = queryParams.length ? "?" + queryParams.join("&") : "";
        var targetURL = apiURL + "utmparams/generate" + queryStr + "&client=" + this.client + "&access_token=b182f027115663f7a5a790b609f61447";
        var c_params = getCookie("utm_params");
        c_params = c_params != "" ? JSON.parse(c_params) : {};
        $.ajax({url: targetURL, "method": "post", success: function (result) {
                if ("status" in result && result.status == true) {
                    setUtmParams(result.amp_id);
                } else {
                    setUtmParams(defaultUtmToken);
                }
            }
            , error: function (xhr, ajaxOptions, thrownError) {

                setUtmParams(defaultUtmToken);
            }
        });
    } else {
        addQueryToAnchors();
    }
}
function setUtmParams(ampUtmToken) {
    var queryParams = $.QueryString;

    var c_params = getCookie("utm_params");
    c_params = c_params != "" ? JSON.parse(c_params) : {};

    if ("utm_campaign" in queryParams) {
        utmID = queryParams['utm_campaign'];
    } else {
        if ("utm_id" in c_params) {
            utmID = c_params["utm_id"];
        } else {
            utmID = dfutm_camid;
        }
    }
    queryParams['utm_campaign'] = ampUtmToken;
    utmToken = ampUtmToken;

    addQueryToAnchors();
    queryParams['utm_source'] = "ampush";


    delete c_params["utm_id"];
    for (var x in c_params) {
        if (!(x in queryParams)) {
            queryParams[x] = c_params[x];
        }
    }


    if (!("utm_medium" in queryParams)) {
        queryParams["utm_medium"] = 'other';
    }

    var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
    for (var x in queryParams) {
        if ($.inArray(x, allowedParams) < 0) {
            delete queryParams[x];
        }
    }

    var c_params = $.extend(true, {}, queryParams);
    c_params["utm_id"] = utmID;
    //console.log(JSON.stringify(c_params));
    document.cookie = "utm_params=" + JSON.stringify(c_params) + ";";

    var url = $("#new_user").attr("action") + ABalytics.getQueryString(queryParams);
    $("#new_user").attr("action", url);
    $("#new_user_pop").attr("action", url);
}
$(document).ready(function () {
    ABalytics.generateToken();
    $('a').click(function () {
        var hr = $(this).attr("href");
        if (hr.search(".stitchfix.com") > 0) {
            if (hr.search("style.stitchfix.com") < 0) {
                chReferer();
            }
        }

    });
});
/* --------------------------------------------- */
function getVariant(val, items) {
    var variant_id = 0;
    for (var x in items) {
        if (val <= items[x]["max"] && val >= items[x]["min"]) {
            variant_id = items[x]["variant_id"];
            ABalytics.variantName = x;
            break;
        }
    }
    return variant_id;
}