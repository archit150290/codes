var site_url = window.location.toString();
var site_q = window.location.search;
var stitchfixUrl = 'https://www.stitchfix.com/';
var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id"];
var utmToken = '';
var utmID = '';
var defaultUtmToken = '68ba126472fa2d9a8bb75a848dbd29cd';
var timer = 0;
var delay = (function () {
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var mobSliderObj = {
    items: 1,
    nav: false,
    loop: true,
    autoplay: true,
    smartSpeed: 1000,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
        300: {
            items: 1
        }
    }
}

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
        p[1] = decodeURIComponent(p[1]).trim();
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
function addQueryToAnchors() {
    $('a[href*=".stitchfix.com"]').each(function () {
        var tUrl = $(this).attr("href");
        tUrl = tUrl.split("?")[0];
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

        if (!("utm_medium" in q_params) || q_params["utm_medium"] == "") {
            q_params["utm_medium"] = 'other';
        }

        var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
        for (var x in q_params) {
            if ($.inArray(x, allowedParams) < 0) {
                delete q_params[x];
            }
        }
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
            p[1] = decodeURIComponent(p[1]).trim();
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var apiURL = window.location.host == "localhost" ? "http://localhost:3000/" : "https://ab.ampush.design/";
var testCases = ["popupform"];
var testConfig = {};
var tc = "";
var ABalytics = (function (window, document, undefined) {
    /* exported ABalytics */
    // Returns a classic or universal analytics wrapper object
    this.variantId = 0;
    this.variantName = "a";
    this.client = "";
    var getVariantId = function () {
        return this.variantId;
    };
    return {
        changes: [],
        init: function (config, slot) {
            var experiment,
                    variants,
                    variant,
                    variantId,
                    change;
            if (typeof (slot) === 'undefined') {
                slot = 1;
            }

            var r = Math.floor((Math.random() * 100) + 1)
            this.range = r;
            this.utm_medium = (typeof $.QueryString['utm_medium'] != 'undefined' && $.QueryString['utm_medium'] != '') ?
                    $.QueryString['utm_medium'].toLowerCase() : "other";
            if (md.mobile() != null) {
                if (this.utm_medium == "brand") {
                    //=====mobile brand 
                    testConfig = {"a": {"min": 0, "max": 0, "variant_id": 0},
                        "b": {"min": 1, "max": 10, "variant_id": 1},
                        "c": {"min": 0, "max": 0, "variant_id": 2},
                        "d": {"min": 0, "max": 0, "variant_id": 3},
                        "e": {"min": 0, "max": 0, "variant_id": 4},
                        "f": {"min": 11, "max": 50, "variant_id": 5},
                        "g": {"min": 0, "max": 0, "variant_id": 6},
                        "h": {"min": 50, "max": 80, "variant_id": 7},
                        "i": {"min": 81, "max": 85, "variant_id": 8},
                        "j": {"min": 41, "max": 50, "variant_id": 9},
                        "k": {"min": 51, "max": 60, "variant_id": 10},
                        "l": {"min": 61, "max": 70, "variant_id": 11},
                        "m": {"min": 71, "max": 80, "variant_id": 12},
                        "n": {"min": 81, "max": 90, "variant_id": 13},
                        "o": {"min": 91, "max": 100, "variant_id": 14},
                    };
                } else {
                    //=====mobile other 
                    testConfig = {"a": {"min": 0, "max": 0, "variant_id": 0},
                        "b": {"min": 1, "max": 5, "variant_id": 1},
                        "c": {"min": 0, "max": 0, "variant_id": 2},
                        "d": {"min": 0, "max": 0, "variant_id": 3},
                        "e": {"min": 0, "max": 0, "variant_id": 4},
                        "f": {"min": 6, "max": 10, "variant_id": 5},
                        "g": {"min": 11, "max": 20, "variant_id": 6},
                        "h": {"min": 21, "max": 30, "variant_id": 7},
                        "i": {"min": 31, "max": 40, "variant_id": 8},
                        "j": {"min": 41, "max": 50, "variant_id": 9},
                        "k": {"min": 51, "max": 60, "variant_id": 10},
                        "l": {"min": 61, "max": 70, "variant_id": 11},
                        "m": {"min": 71, "max": 80, "variant_id": 12},
                        "n": {"min": 81, "max": 90, "variant_id": 13},
                        "o": {"min": 91, "max": 100, "variant_id": 14},
                    };
                }
            } else {
                if (this.utm_medium == "brand") {
                    //=====desktop brand 
                    testConfig = {"a": {"min": 0, "max": 0, "variant_id": 0},
                        "b": {"min": 0, "max": 0, "variant_id": 1},
                        "c": {"min": 0, "max": 0, "variant_id": 2},
                        "d": {"min": 0, "max": 0, "variant_id": 3},
                        "e": {"min": 0, "max": 0, "variant_id": 4},
                        "f": {"min": 1, "max": 75, "variant_id": 5},
                        "g": {"min": 76, "max": 85, "variant_id": 6},
                        "h": {"min": 86, "max": 95, "variant_id": 7},
                        "i": {"min": 96, "max": 100, "variant_id": 8},
                        "j": {"min": 0, "max": 0, "variant_id": 9},
                        "k": {"min": 0, "max": 0, "variant_id": 10},
                        "l": {"min": 0, "max": 0, "variant_id": 11},
                        "m": {"min": 0, "max": 0, "variant_id": 12},
                        "n": {"min": 0, "max": 0, "variant_id": 13},
                        "o": {"min": 0, "max": 0, "variant_id": 14},
                    };
                } else {
                    //=====desktop other 
                    testConfig = {"a": {"min": 0, "max": 0, "variant_id": 0},
                        "b": {"min": 0, "max": 0, "variant_id": 1},
                        "c": {"min": 0, "max": 0, "variant_id": 2},
                        "d": {"min": 0, "max": 0, "variant_id": 3},
                        "e": {"min": 0, "max": 0, "variant_id": 4},
                        "f": {"min": 1, "max": 80, "variant_id": 5},
                        "g": {"min": 81, "max": 90, "variant_id": 6},
                        "h": {"min": 91, "max": 100, "variant_id": 7},
                        "i": {"min": 0, "max": 0, "variant_id": 8},
                        "j": {"min": 0, "max": 0, "variant_id": 9},
                        "k": {"min": 0, "max": 0, "variant_id": 10},
                        "l": {"min": 0, "max": 0, "variant_id": 11},
                        "m": {"min": 0, "max": 0, "variant_id": 12},
                        "n": {"min": 0, "max": 0, "variant_id": 13},
                        "o": {"min": 0, "max": 0, "variant_id": 14},
                    };
                }
            }
            variantId = getVariant(r, testConfig);
            console.log(r + "-" + variantId);
            this.variantId = variantId;
            
        },
        // apply the selected variants for each experiment
        applyHtml: function () {
            if (md.mobile() == null || md.tablet() != null || (this.variantId >= 0 && this.variantId <= 8)) {
                ABalytics.paintOnLoad(".deck-show", function () {
                    $(".deck-show").css("display", "block");
                }, 10);
            }
            window.onresize = function () {
                if (window.innerWidth > 767) {
                    $(".deck-show").css("display", "block");
                }
            };
            ABalytics.paintOnLoad(".show-sm", function () {
                var movbanner = $('.show-sm').attr('class');
                var ranvbanner = movbanner.substring(0, movbanner.length - 1) + getRandomInt(1, 4);
                $('.show-sm').attr('class', ranvbanner);
                $('.show-sm').css('display', 'block');
            }, 10);
            ABalytics.paintOnLoad(".horizontal", function () {
                var mobbanner = $('.horizontal').attr('class');
                var ranbanner = mobbanner.substring(0, mobbanner.length - 1) + getRandomInt(1, 6);
                $('.horizontal').attr('class', ranbanner);
                $('.horizontal').css("display", "block")
            }, 10);
            switch (this.variantId) {
                case  0:
                    break;
                case  1:
                    ABalytics.paintOnLoad(".copy", function () {
                        $(".copy").addClass("addQuestion");
                    }, 20);
                    break;
                case  2:
                    ABalytics.paintOnLoad(".fb-login-c", function () {
                        $(".fb-login-c").show();
                        ABalytics.VariantRequirement.HideZip();
                    }, 20);
                    break;
                case  3:
                    ABalytics.paintOnLoad(".fb-login-d", function () {
                        $(".fb-login-d").show();
                        ABalytics.VariantRequirement.HideZip();
                    }, 20);
                    break;
                case  4:
                    ABalytics.paintOnLoad(".fb-login-c", function () {
                        $(".copy").addClass("addQuestion");
                        $(".fb-login-c").show();
                        ABalytics.VariantRequirement.HideZip();
                    }, 20);
                    break;
                case  5:
                    ABalytics.VariantRequirement.VariantF();
                    break;
                case  6:
                    ABalytics.paintOnLoad(".copy", function () {
                        $(".copy").addClass("addQuestion");
                        ABalytics.VariantRequirement.HideZip();
                    }, 20);
                    break;
                case  7:
                    ABalytics.paintOnLoad("#new_user", function () {
                        $(".copy").addClass("addQuestion");
                        $(".copy").find(".ptc2").css("display", "block");
                        $(".copy").find(".ptc1").css("display", "none");
                        $(".fb-login-d").show();
                        $(document).on("click", ".copy .btn-group", function () {
                            delay(function () {
                                $(".rbtn-scale").parent().removeClass("active");
                                $(".rbtn-scale").prop("checked", false);
                                $("#new_user .btn-group").parent(".form-group").css("display", "none")
                                var valueselected = $('.copy .btn-group input:radio:checked').val();
                                $(".rbtn-scale[value=" + valueselected + "]").parent().addClass("active");
                                console.log("Value Selected is " + valueselected);
                                $(".rbtn-scale[value=" + valueselected + "]").prop("checked", true);
                            }, 500);
                        })
                        ABalytics.VariantRequirement.HideZip();
                    }, 5);
                    break;
                case  8:
                    ABalytics.paintOnLoad("#getStart-dialog", function () {
                        $(".fb-login-c").show();
                        ABalytics.VariantRequirement.HideZip();
                    }, 20);
                    $(window).load(function () {
                        $('#getStart-dialog').modal('show');
                    });
                    break;
                case  9:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver4-2");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    break;
                case 10:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver4-3");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    $(document).scroll(function () {
                        (isFormVisible() == true || isNavBarVisible() == true) ? $("#carousel-background1 .ptc1").hide() : $("#carousel-background1 .ptc1").show();
                    });
                    break;
                case 11:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver2-2");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    break;
                case 12:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver2-3");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    $(document).scroll(function () {
                        (isFormVisible() == true || isNavBarVisible() == true) ? $("#carousel-background1 .ptc1").hide() : $("#carousel-background1 .ptc1").show();
                    });
                    break;
                case 13:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver3-2");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    break;
                case 14:
                    ABalytics.paintOnLoad(".mob-slider", function () {
                        $("body").addClass("mob-ver ver3-3");
                        $('.mob-slider').owlCarousel(mobSliderObj);
                    }, 20);
                    ABalytics.VariantRequirement.VariantF();
                    $(document).scroll(function () {
                        (isFormVisible() == true || isNavBarVisible() == true) ? $("#carousel-background1 .ptc1").hide() : $("#carousel-background1 .ptc1").show();
                    });
                    break;
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

ABalytics.VariantRequirement = {
    HideZip: function () {
        $("input[name='user[client_attributes][shipping_postcode]']").attr('type', 'hidden');
        $("input[name='user[client_attributes][shipping_postcode]']").parent().css('display', 'none');
    },
    VariantF: function () {
        ABalytics.paintOnLoad(".fb-login-d", function () {
            $(".copy").addClass("addQuestion");
            $(".fb-login-d").show();
            this.ABalytics.VariantRequirement.HideZip();
        }, 20);
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

    if (!("utm_medium" in queryParams) || queryParams["utm_medium"] == "") {
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
    document.cookie = "utm_params=" + JSON.stringify(c_params) + ";";
    var url = $("#new_user").attr("action") + ABalytics.getQueryString(queryParams);
    url = $("#new_user").attr("action").split("?")[0] + ABalytics.getQueryString(queryParams);
    $("#new_user").attr("action", url);
    $("#new_user_pop").attr("action", url);
    $("#new_user_auto_pop").attr("action", url);
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
