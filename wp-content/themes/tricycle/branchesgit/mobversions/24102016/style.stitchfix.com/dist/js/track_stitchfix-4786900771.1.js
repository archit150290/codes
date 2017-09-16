//live
//  Facebook
!function (f, b, e, v, n, t, s) {
    if (f.fbq)
        return;
    n = f.fbq = function () {
        n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq)
        f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
}(window,
        document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1788766331342814');
fbq('trackCustom', "LandingPageView");


!function () {
    var t = document.createElement("script");
    t.setAttribute("type", "text/javascript");
    t.setAttribute("src", "//files.ampush.io/tracker.js?" + (new Date).valueOf());
    "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
    t.onload = function () {
        ampt.init("stitchfix"), ampt.pageview({})
    }
}();
// Bing
(function (w, d, t, r, u) {
    var f, n, i;
    w[u] = w[u] || [], f = function () {
        var o = {ti: "5280092"};
        o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
    }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
        var s = this.readyState;
        s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
    }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
})(window, document, "script", "//bat.bing.com/bat.js", "uetq");
// Google
/* <![CDATA[ */
goog_snippet_vars = function () {
    var w = window;
    w.google_conversion_id = 879950942;
    w.google_conversion_label = "7uTYCOHHs2cQ3vjLowM";
    w.google_remarketing_only = false;
}
// DO NOT CHANGE THE CODE BELOW.
goog_report_conversion = function (url) {
    goog_snippet_vars();
    window.google_conversion_format = "3";
    var opt = new Object();
    opt.onload_callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    }
    var conv_handler = window['google_trackConversion'];
    if (typeof (conv_handler) == 'function') {
        conv_handler(opt);
    }
}

$(document).ready(function () {
    $(".get-started").click(function () {
        ampt.click('stitchfix_getStarted');
    });

    $(".getStart-pop-close").click(function () {
        ampt.click('InitiateQuiz_pop_close');
    });
});

function eventONSubmit(formData) {
    var formData = formData || '';
    // Facebook Pixel Code for navigating to the Style Quiz
    fbq('trackCustom', 'InitiateQuiz');
    goog_report_conversion();
    ampt.click('InitiateQuiz', {"formData": formData});
    //Bing
   /* (function (w, d, t, r, u) {
        var f, n, i;
        w[u] = w[u] || [], f = function () {
            var o = {ti: "5284077"};
            o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
        }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
            var s = this.readyState;
            s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null)
        }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i)
    })(window, document, "script", "//bat.bing.com/bat.js", "uetq");*/
}

var site_url = window.location.toString();
var site_q = window.location.search;