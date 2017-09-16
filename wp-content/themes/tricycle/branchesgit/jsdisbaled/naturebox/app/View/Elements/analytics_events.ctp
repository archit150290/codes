<script type="text/javascript">
    !function(){var analytics = window.analytics = window.analytics || []; if (!analytics.initialize)if (analytics.invoked)window.console && console.error && console.error("Segment snippet included twice."); else{analytics.invoked = !0; analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "page", "once", "off", "on"]; analytics.factory = function(t){return function(){var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics}}; for (var t = 0; t < analytics.methods.length; t++){var e = analytics.methods[t]; analytics[e] = analytics.factory(e)}analytics.load = function(t){var e = document.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = ("https:" === document.location.protocol?"https://":"http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var n = document.getElementsByTagName("script")[0]; n.parentNode.insertBefore(e, n)}; analytics.SNIPPET_VERSION = "3.1.0";
            analytics.load("6Ux56g3C2NpnigEfWOPvrghLpJort4vR");
            console.log("write key: 6Ux56g");
            analytics.page();
    }}();
analytics.identify('f4ca124298', {
  name: 'Michael Bolton',
  email: 'mbolton@initech.com'
});
analytics.track('Clicked CTA', { location: 'header', type: 'button' });
           analytics.page({ path: '/', referrer: '', search: '', title: 'Get Started', url: 'http://naturebox.ampush.design/' });
           analytics.track('Signed Up', {
  plan: 'Startup',
  source: 'Analytics Academy'
});
analytics.page('Checkout',"5 Snacks",{"ids":[1,25,50]});
analytics.page('Checkout', {
  title: 'Snack Pricing',
  url: 'https://naturebox.ampush.design/pricing',
  path: '/pricing',
  referrer: 'https://naturebox.ampush.design'
});
analytics.alias('019mr8mf4r');
analytics.group('test_group', {
  name: "Initech",
  industry: "Technology",
  employees: 329
});
var link = document.getElementById('free-trial-link');

analytics.trackLink(link, 'Clicked Free-Trial Link', {
  plan: 'Enterprise'
});

</script>