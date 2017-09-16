function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
var is_safari = navigator.userAgent.indexOf("Safari");
jQuery(function(){
    //===============using esc key to close modal
    $(document).keydown(function(e){
        var keycode = e.keyCode;
        if(keycode == 27){
            if(document.cookie.indexOf('interstitial-ad') == -1){
                if(is_safari > -1){
                    sessionStorage.setItem("interstitial-ad", "enewsad");
                }else{
                    setCookie("interstitial-ad", "enewsad", 0);
                }
            }
            $(".interstitial-ad-modal .modal-fade-screen").removeClass("modal-visible");
            $('.modal-state:checked').prop('checked', false).change();
        }
    });
    
//    $(document).mouseup(function (e) {
//        var clnew = $(e.target).attr('class');
//        if(clnew == "modal-fade-screen" || clnew =="modal-fade-screen modal-visible"){
//            if(document.cookie.indexOf('interstitial-ad') == -1){
//                if(is_safari > -1){
//                sessionStorage.setItem("interstitial-ad", "enewsad");
//                }else{
//                    setCookie("interstitial-ad", "enewsad", 0);
//                }
//            }
//            $(".interstitial-ad-modal .modal-fade-screen").removeClass("modal-visible");
//            $('.modal-state:checked').prop('checked', false).change();
//        }
//    });
    
    //=============binding touch device with the side click
    $(document).bind( "mouseup touchend", function(e){
         var clnew = $(e.target).attr('class');
        if(clnew == "modal-fade-screen" || clnew =="modal-fade-screen modal-visible"){
            if(document.cookie.indexOf('interstitial-ad') == -1){
                if(is_safari > -1){
                    sessionStorage.setItem("interstitial-ad", "enewsad");
                }else{
                    setCookie("interstitial-ad", "enewsad", 0);
                }
            }
            $(".interstitial-ad-modal .modal-fade-screen").removeClass("modal-visible");
            $('.modal-state:checked').prop('checked', false).change();
        }
    });

    //var $form = $('#mc-embedded-subscribe-form');
    //    $('#mc-embedded-subscribe').on('click', function(event) {
    //      if(event) event.preventDefault();
    //      register($form);
    //    });
    $('.modal-fade-screen .modal-close').on('click', function () {
        if(document.cookie.indexOf('interstitial-ad') == -1){
            if(is_safari > -1){
                sessionStorage.setItem("interstitial-ad", "enewsad");
            }else{
                setCookie("interstitial-ad", "enewsad", 0);
            }
        }
        $(".interstitial-ad-modal .modal-fade-screen").removeClass("modal-visible");
        $('.modal-state:checked').prop('checked', false).change();
    });
    
    /*
     * on window scroll half way pop up function
     */
    if(jQuery("#interstitial-ad-tag").val()==1){
        jQuery(window).scroll(function () { 
            var is_safari = navigator.userAgent.indexOf("Safari");
            if(is_safari > -1){
                if (!sessionStorage.getItem("interstitial-ad") && document.cookie.indexOf('interstitial-ad') == -1 && document.cookie.indexOf('Cambey_Login') == -1 && jQuery(window).scrollTop() > jQuery('body').height() / 2) {
                        $(".interstitial-ad-modal .modal-fade-screen").addClass("modal-visible");
                    //modal('action');
                } 
            }else{
                if (document.cookie.indexOf('interstitial-ad') == -1 && document.cookie.indexOf('Cambey_Login') == -1 && jQuery(window).scrollTop() > jQuery('body').height() / 2) {
                    $(".interstitial-ad-modal .modal-fade-screen").addClass("modal-visible");
                }
            }
            
        });
    }
    
    /*
     * query set to remove div rul responsive class from aside articles
     */
    if(jQuery('.rubric_small').length == 3){
        jQuery('div.rule-responsive').last().remove();
    }
    //==========remove path for search icon gcse
    
    //Login
    jQuery("form#login #login-button").click(function(){
        if(jQuery('#login')[0].checkValidity() == true){
            if(jQuery.trim(jQuery("#l_email").val()) && jQuery.trim(jQuery("#l_pass").val()))
            {
                var thisFormId = $(this).closest('form').attr('id');
                active_form_id = thisFormId;
                jQuery(this).attr("disabled",true); 
                var usermail = jQuery("#l_email").val();

                $.ajax({
                    type:"POST",
                    data:jQuery("form#"+active_form_id).serialize(),
                    url: jQuery("form#"+active_form_id).attr("ref")+"/cambey-login.php",
                    beforeSend: function(){  jQuery("#loadingimage_login").css("display","inline-block"); },
                    success : function(data) {
                        var objData = JSON.parse(data);
                        if(objData.status == "success")
                        {
                            setCookie("Cambey_Login", objData.name, 365);
                            setCookie("Cambey_Account", window.btoa(objData.accountNo), 365);
                            location.reload();
                        }
                        else if(objData.status == "fail")
                        {
                            jQuery("#loadingimage_login").css("display","none");
                            jQuery(this).attr("disabled",false); 
                            jQuery('#login-button').removeAttr('disabled');
                            jQuery("#login-modal-submit").removeAttr("disabled",false); 
                            jQuery("#login-modal-email").val(usermail);
                            loginmodal('login');
                            jQuery(".js_error").html('<span>'+objData.message+'</span>');
                        }
                    },
                    error : function() {
                        jQuery("#login-button").attr("disabled",false);
                        jQuery("#loadingimage_login").css("display","none");
                        jQuery("#login-modal-submit").removeAttr("disabled",false); 
                        alert("Error!");
                    }
                });
            }
            else
            {
                jQuery(this).removeAttr("disabled",false);
                loginmodal('login');
                jQuery(".js_error").html('<span>Please fill email and password.</span>');
            }
        }
    });
    
    jQuery("form#login, form#login-modal-form, form#login-side-form, form#login_paywall").submit(function(event) {
        event.preventDefault();
    });
    
    jQuery("#login-paywall-button, #login-paywall-popup-button, #login-modal-submit, #side-login-submit").click(function(){
        var formName = jQuery(this).closest("form");
        if(jQuery('#'+formName[0]['id'])[0].checkValidity() == true){
            var thisFormId = $(this).closest('form').attr('id');
            active_form_id = thisFormId;
            var activebutton = jQuery(this);
            jQuery(activebutton).attr("disabled",true); 
            if(jQuery.trim(jQuery("form#"+active_form_id+" #l__paywall_email").val()) && jQuery.trim(jQuery("form#"+active_form_id+" #l_paywall_pass").val()))
            {
                $.ajax({
                    type:"POST",
                    data:jQuery("form#"+active_form_id).serialize(),
                    url: jQuery("form#"+active_form_id).attr("ref")+"/cambey-login.php",
                    beforeSend: function(){  jQuery("#loadingimage_login").css("display","inline-block"); },
                    success : function(data) {
                        var objData = JSON.parse(data);
                        if(objData.status == "success")
                        {
                            setCookie("Cambey_Login", objData.name, 365);
                            setCookie("Cambey_Account", window.btoa(objData.accountNo), 365);
                            $('#login-modal-switch').prop('checked', false);
                            location.reload();

                        }
                        else if(objData.status == "fail")
                        {
                            jQuery(activebutton).attr("disabled",false); 
                            jQuery("#loadingimage_login").css("display","none");
                            jQuery("#login-modal-submit").removeAttr("disabled",false); 
                            jQuery(".paywall-modal").find('#paywall-modal-switch').prop('checked', false);
                            loginmodal('login');
                            jQuery(".js_error").html('<span>'+objData.message+'</span>');
                        }
                    },
                    error : function() {
                        jQuery(activebutton).attr("disabled",false);
                        jQuery("#loadingimage_login").css("display","none");
                        jQuery("#login-modal-submit").removeAttr("disabled",false); 
                        alert("Error!");
                    }
                });            
            }
            else
            {
                jQuery("#loadingimage_login").css("display","none");
                jQuery("#login-modal-submit").removeAttr("disabled",false);
                jQuery(this).attr("disabled",false); 
                jQuery(".paywall-modal").find('#paywall-modal-switch').prop('checked', false);
                loginmodal('login');
                jQuery(".js_error").html('<span>Please fill email and password.</span>');
            }
        }
    });
    
    //Logout
    jQuery(".logout-link").click(function(){
        jQuery.post(jQuery("form#login").attr("ref")+"/cambey-login.php", {action: "logout"})
        .done(function(data) {
            var objData = JSON.parse(data);
            if(objData.status == "success")
            {
                setCookie("Cambey_Login", "", -1);
                setCookie("Cambey_Account", "", -1);
                jQuery('#login-button').removeAttr('disabled');
                location.reload();
            }
        })
        .fail(function() {
            alert("Error!");
        });
    });
    
    jQuery(".showcomments").click(function(){  
        if($("#disqus_thread").length) 
        {
            if($('#disqus_thread').is(':visible'))
            { 
                $("#disqus_thread").delay(500).fadeOut();
                $("#commentlink_title").html("View Comments");
            }else{  
                $("#disqus_thread").delay(500).fadeIn();
                $("#commentlink_title").html("Hide Comments");
            }
        }
        else
        {
            if($('#comments').is(':visible'))
            { 
                $("#comments").delay(500).fadeOut();
                $("#commentlink_title").html("View Comments");
            }else{  
                $("#comments").delay(500).fadeIn();
                $("#commentlink_title").html("Hide Comments");
            }
        }
                    
    });
    
    $('li.yeardropdown').click(function () {
        var year = $(this).attr('rel');
        if (year != "") {
            var currentUrl = pageurl;
            window.location.href = currentUrl + year;
        } else {
            return false;
        }
    });
    
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');                
            }
        };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
            $('.header-desktop .login-link').click();
        });
    }    
});
        
//ajax call to load more posts for topic category and tags
function loadmoretopic(){
    var target = document.getElementById('loadingimage');
    var spinner = new Spinner(opts).spin(target);
    var postId=jQuery("#postId").val();
    var taxName=jQuery("#taxname").val();
    var taxonomy=jQuery("#taxonomy").val();
    jQuery("#PleaseLoadMore").remove();
    jQuery("#loadingimage").show();
    jQuery.ajax({
        type: 'POST',
        url: ajax_url,
        data: {
            action: 'loadmoreajax',
            postId: postId,
            taxname: taxName,
            taxonomy:taxonomy,
        },
        success: function (data, textStatus, XMLHttpRequest) {
            jQuery("#postId").remove();
            jQuery("#loadingimage").remove();
            jQuery(".loader-more").remove();
            jQuery(".landing-stack-1").append(data);
        },
        error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });    
}
 
//ajax call to load more posts for topic category and tags
function LoadMoreAuthor()
{
    var target = document.getElementById('loadingimage');
    var spinner = new Spinner(opts).spin(target);
    var PostId = jQuery("#postId").val();
    var AuthorId = jQuery("#authorId").val();
    jQuery("#LoadMore").remove();
    jQuery("#loadingimage").show();
    jQuery.ajax({
        type:'POST',
        url:ajax_url,
        data: {
            action: 'LoadMoreAuthor',
            postId: PostId,
            authorId: AuthorId,
        },        
        success: function (data, textStatus, XMLHttpRequest) {
            jQuery("#postId").remove();
            jQuery("#loadingimage").remove();
            jQuery(".loader-more").remove();
            jQuery(".landing-stack").append(data);
        },
        error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function loadmorearchive(){
    var target = document.getElementById('loadingimage');
    var spinner = new Spinner(opts).spin(target);
    var postId=jQuery("#postId").val();
    var posttype=jQuery("#posttype").val();
    var searchyear=jQuery("#searchyear").val();
    jQuery("#archiveloadmore").parent().remove();
    jQuery("#loadingimage").show();
    jQuery.ajax({
        type: 'POST',
        url: ajax_url,
        dataType: 'json',
        data: {
            action: 'archiveloadmore',
            postId: postId,
            posttype: posttype,
            searchyear:searchyear,
        },
        beforeSend: function(){
            jQuery("#loadingimage").css('height','50px');
        },
        success: function (data, textStatus, XMLHttpRequest) {
            jQuery("#loadingimage").css('height','0px');
            jQuery("#postId").remove();
            jQuery("#loadingimage").remove();
            jQuery('.loader-more').remove();
            jQuery("#moredata").append(data['html']);
            jQuery("#moredata").parent().append(data['pager']);
        },
        error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });  
}
   
function LoadMoreMagazine()
{
   var target = document.getElementById('loadingimage');
   var spinner = new Spinner(opts).spin(target);
   var Topicstermid=jQuery("#TopicstermId").val();
   var oldyear = jQuery("#oldyear").val();
   jQuery("#loadmoremagazine").parent().remove();
   jQuery.ajax({
        type: 'POST',
        url: ajax_url,
        dataType: 'json',
        data: {
            action: 'MagazineLoadMore',
            Topicstermid: Topicstermid,
            oldyear: oldyear,
           },
        success: function (data, textStatus, XMLHttpRequest) {
           jQuery("#TopicstermId").remove();
           jQuery("#loadingimage").remove();
           jQuery(".loader-more").remove();
           jQuery("#moredata").append(data['html']);
           jQuery("#moredata").parent().append(data['pager']);

        },
        error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
   
function LoadMoreTrikedaily()
{
    var target = document.getElementById('loadingimage');
    var spinner = new Spinner(opts).spin(target);
    var PostId=jQuery("#postId").val();
    jQuery("#trikedailyloadmore").remove();
    jQuery("#loadingimage").show();
    jQuery.ajax({
        type: 'POST',
        url: ajax_url,
        data: {
            action: 'TrikeDailyLoadMore',
            postId: PostId,
           },
        beforeSend: function(){
            jQuery("#loadingimage").css('height','50px');
        },
        success: function (data, textStatus, XMLHttpRequest) {
           jQuery("#loadingimage").css('height','0px');
           jQuery("#postId").remove();
           jQuery('.loader-more').remove();
           jQuery("#loadingimage").remove();
           jQuery("#landing-stack-loadmore").append(data);

        },
        error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}
   
function loginmodal(dept){
    $('#login-modal-switch').prop('checked', true);
}
