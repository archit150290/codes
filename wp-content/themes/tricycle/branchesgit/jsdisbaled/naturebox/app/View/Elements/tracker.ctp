<script type="text/javascript">
    //<![CDATA[
<?php if (isset($_SERVER["HTTP_HOST"]) && $_SERVER["HTTP_HOST"] != "localhost") { ?>
        var owa_baseUrl = 'http://localhost/analytics/owa/';
        var owa_cmds = owa_cmds || [];
        owa_cmds.push(['setSiteId', 'b6e0f8cc02067861c52619b1a60e88e7']);
        owa_cmds.push(['trackPageView']);
        owa_cmds.push(['trackClicks']);
        owa_cmds.push(['trackDomStream']);

        (function () {
            var _owa = document.createElement('script');
            _owa.type = 'text/javascript';
            _owa.async = true;
            owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl);
            _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
            var _owa_s = document.getElementsByTagName('script')[0];
            _owa_s.parentNode.insertBefore(_owa, _owa_s);
        }());
<?php } else { ?>
        var owa_baseUrl = 'http://54.210.61.191/analytics/';
        var owa_cmds = owa_cmds || [];
        owa_cmds.push(['setDebug', true]);
        owa_cmds.push(['setSiteId', 'f7438d51cd8064e786e442230c76debc']);
        owa_cmds.push(['trackPageView']);
        owa_cmds.push(['trackClicks']);
        owa_cmds.push(['trackDomStream']);

        (function () {
            var _owa = document.createElement('script');
            _owa.type = 'text/javascript';
            _owa.async = true;
            owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl);
            _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
            var _owa_s = document.getElementsByTagName('script')[0];
            _owa_s.parentNode.insertBefore(_owa, _owa_s);
        }());
<?php } ?>
//]]>
</script>