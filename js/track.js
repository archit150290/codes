var track = {};
track.fireCustomPixel = function (utmToken) {
    /* google pixel */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
     ga('create', 'UA-97162165-1', 'auto');
     var GACustomDimesions = {
        "LandingPage"   : "dimension1",
        "SubscribePage" : "dimension2",
        "BlogPage"      : "dimension3",
        "trackerId"     : "dimension4",
        "auid"          : "dimension5",
     }
     //====defining dimensions on basis of pageType
     if(typeof pageType != "undefined" && pageType != ""){
        ga('set', GACustomDimesions[pageType], track.getVariant());
     }
    //==============================================
     
     //====creating dimesions on basis of GA auid
     var CreateObjectQueryParams = getQueryParams(window.location.search);
     var checkUid = settings.specialParams+'auid' in CreateObjectQueryParams;
     if(checkUid)
        ga('set', GACustomDimesions["auid"], CreateObjectQueryParams[settings.specialParams+"auid"]);
     //===========================================

     
    /* facebook pixel */
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
    fbq('init', '177398499339719'); // Insert your pixel ID here.
    fbq('track', 'PageView');
    fbq('init', '1762965547348977'); // Insert your pixel ID here.
    fbq('track', 'PageView');
    if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
        custom_event = $('.customEvent').val();
        fbq('trackCustom', custom_event);
    }
    if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
        custom_event = $('.customEventB').val();
        fbq('trackCustom', custom_event);
    }

    /** -- Ampush tracking call --**/
    /*-- Ampush Pixel Code --*/
    var t = document.createElement("script");
    t.setAttribute("type", "text/javascript");
    t.setAttribute("src", "//files.ampush.io/js/tracker.js?" + (new Date).valueOf());
    "undefined" != typeof t && document.getElementsByTagName("head")[0].appendChild(t);
    /*-- Ampush Pixel Code --*/
    t.onload = function () {
        ampt.init("hubble", "e2f228d4-3be5-4f38-ad04-872a233186d5");
        var trackUtmPrams = abanalytics.setUtmParams('tracker', utmToken);
        variantName = track.getVariant();
        trackUtmPrams["utm_variant"] = variantName;
        ampt.pageview(trackUtmPrams);
        if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
            custom_event = $('.customEvent').val();
            ampt.track(custom_event, trackUtmPrams);
        }
        if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
            custom_event = $('.customEventB').val();
            ampt.track(custom_event, trackUtmPrams);
        }

        if(getCookie("amptuid") && getCookie("amptuid")!="")
            ga('set', GACustomDimesions["trackerId"], getCookie("amptuid"));    
        
        var checkFS = setInterval(function(){
            if(typeof FS!="undefined" && FSstart == true){
                FSstart = false;
                console.log("variant saved to FS")

                clearInterval(checkFS);
                console.log(getCookie("amptuid"), variantName);
                FS.setUserVars({
                    "displayName" : getCookie("amptuid"),
                    "variant_str"   : variantName,
                    "tracker_str" : getCookie("amptuid")
                });    
            }
        },1000)
        setTimeout(function(){
             clearInterval(checkFS);
        },5000);

        sendGaEvents();
    }
    t.onerror = function(){
        sendGaEvents();
    }

    //Ampush LiveIntent Remarketing Pixel Code 
    !function(){var t=document.createElement("script");t.setAttribute("type","text/javascript");
    t.setAttribute("src","//b-code.liadm.com/a-00re.min.js");t.setAttribute("async","true");t.setAttribute("charset","utf-8");
    "undefined"!=typeof t&&document.getElementsByTagName("head")[0].appendChild(t);}()
    //End Ampush LiveIntent Remarketing Pixel Code 
}

track.getVariant = function(){
    var paths = window.location.pathname;
    var filename = paths.split("/").pop();
    pageName = filename.replace(".html", "");
    //===variant name to be added on every page
    //var variantName = "hubble-replica-b";
    var variantName = (typeof variantNameNew == "undefined") ? "hubble-replica-b": variantNameNew;
    if(pageName != "" && typeof variantNameNew == "undefined")
        variantName = "hubble-replica-"+pageName+"-b";
    //alert(variantName)
    return variantName;
}

/*-- Click events --*/
//$('.eventTrack').on('click', function () {
$(document).on('click', '.eventTrack', function () {
    var rel = $(this).attr('rel');
    if(typeof rel != 'undefined' && rel){
        var rel = rel.split(",");
    }
    var target = $(this).attr('href');
    if (typeof rel != 'undefined' && rel.length>0) {
        var x;
        variantName = track.getVariant();
        var trackUtmPrams = {};
        trackUtmPrams["utm_variant"] = variantName;
        for (x in rel) {
            
            if (typeof fbq != 'undefined' && fbq) {
                fbq('trackCustom', rel[x].trim());
            }
            if (typeof ampt != 'undefined' && ampt) {
                ampt.track(rel[x].trim(),trackUtmPrams);
            }
            if (typeof ga != 'undefined' && ga) {
                try{
                    if(typeof target == 'undefined' || target=='' || target=='javascript:void(0);'){
                        target = rel[x].trim();
                    }
                    ga('send', 'event', {
                        eventCategory: rel[x].trim(),
                        eventAction: 'click',
                        eventLabel: target
                    });
                }catch(e){
                    console.log(e);
                }
            }

        }
    }
})

/*-- Click events --*/
//==taboola pixel
window._tfa = window._tfa || [];
_tfa.push({ notify: 'mark',name: 'site_visitor' })
!function(){var t=document.createElement("script");t.setAttribute("type","text/javascript");
t.setAttribute("src","//cdn.taboola.com/libtrc/ampush-hubblecontacts-sc/tfa.js");
"undefined"!=typeof t&&document.getElementsByTagName("head")[0].appendChild(t);}()


track.customEventFire = function(events){
    var rel = events;
    var rel = rel.split(",");
    if (rel != 'undefined' && rel.length>0) {
        var x;
        variantName = track.getVariant();
        var trackUtmPrams = {};
        trackUtmPrams["utm_variant"] = variantName;
        for (x in rel) {
            
            if(rel[x].trim()!="firePageView"){
                if (typeof fbq != 'undefined' && fbq) {
                    fbq('trackCustom', rel[x].trim());
                }
                if (typeof ampt != 'undefined' && ampt) {
                    ampt.track(rel[x].trim(),trackUtmPrams);
                }
                if (typeof ga != 'undefined' && ga) {
                    if(rel[x].trim() == 'SubscribeDoctorPageVisit' || rel[x].trim() == 'SubscribeReviewPageVisit' || rel[x].trim() == 'SubscribeRxPageVisit'){
                        ga('send', 'event', {
                            eventCategory: rel[x].trim(),
                            eventAction: 'pageload',
                            eventLabel: rel[x].trim()
                        });
                    }else{
                        ga('send', 'event', {
                            eventCategory: rel[x].trim(),
                            eventAction: 'click',
                            eventLabel: rel[x].trim()
                        });
                    } 
                }
            }else{
                var trackUtmPrams = abanalytics.setUtmParams('tracker', utmToken);
                trackUtmPrams["utm_variant"] = variantName;
                if (typeof ampt != 'undefined' && ampt) {
                    ampt.pageview(trackUtmPrams);
                }
                if (typeof fbq != 'undefined' && fbq) {
                    fbq('track', 'PageView');
                }
                if (typeof ga != 'undefined' && ga) {
                    ga('send', 'pageview');
                }
            }
        }
    }
}

function sendGaEvents(){
     ga('send', 'pageview');
     if (typeof $('.customEvent').val() != "undefined" && $('.customEvent').val()) {
        custom_event = $('.customEvent').val();
        ga('send', 'event', {
            eventCategory: custom_event,
            eventAction: 'pageload',
            eventLabel: window.location.href
        });
     }
     if (typeof $('.customEventB').val() != "undefined" && $('.customEventB').val()) {
        custom_event = $('.customEventB').val();
        ga('send', 'event', {
            eventCategory: custom_event,
            eventAction: 'pageload',
            eventLabel: window.location.href
        });
     }
}
