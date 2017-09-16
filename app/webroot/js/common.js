/* 
 file which is included for both admin portal and client portal
 */
//document ready start
var count = 0; // needed for safari
window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("back", null, null);
        window.onpopstate = function () {
            history.pushState('back', null, null);
            if (count == 1) {
                if (referer != false) {
                    window.location.href = referer;
                } else {
                }
            }
        };
    }

    setTimeout(function () {
        count = 1;
    }, 200);
}

$(document).ready(function () {

    var e = $("#refreshed").val();
    if (e == "no") {
        $("#refreshed").val("yes");
    }
//        alert(e);
//        if(e == "no") {
//            $("#refreshed").val("yes");
//        } else {
//            $("#refreshed").val("no");
//            window.location.reload();
//        }


});//document ready end

//==========function for bootbox.alert
function alertbootboxcb(msg, cb) {
    bootbox.alert({
        closeButton: false,
        "message": msg,
        "callback": function () {
            cb();
        }
    });
}
//==========function for bootbox.alert with call back function
function alertbootbox(msg) {
    bootbox.alert({
        closeButton: false,
        "message": msg,
        "className": "bootboxalertclass",
        "callback": function () {
            console.log("successfull");
        }
    });
    //=====added class to change cross button of bootbox
}
var timer = 0;
var delay = (function () {
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var btnObj = {
    'confirm': {
        label: 'Yes',
        className: 'btn-danger'
    },
    'cancel': {
        label: 'No',
        className: 'btn-default pull-right'
    },
};

//==============================addding option for create client and edit client
function add(category, scategory) {
    var value = jQuery("#UserOther" + category).val();
    console.log(value);
    if ($('select#User' + scategory + ' option[value="' + value + '"]').length == 1) {
        alertbootbox('This option already exists');
    } else {
        $('<option value="' + value + '">' + value + '</option>').insertBefore("select#User" + scategory + " option[value=other]");
        jQuery("#UserOther" + category).val("");
        jQuery("#other_User" + scategory).toggle();
        $('select#User' + scategory + ' option[value="' + value + '"]').prop('selected', true);
        $('select#User' + scategory + ' option[value="other"]').prop('selected', false);

    }
}

//=function used to trim and lowercase a string
function trimAndLowerCaseString(string) {
    var resultantstring = $.trim(string);
    resultantstring = resultantstring.toLowerCase();
    return resultantstring;
}

var dateparameters = {
    showOn: "button",
    buttonImage: siteurl + "img/calendar.gif",
    buttonImageOnly: true,
    changeMonth: true,
    changeYear: true,
    required: true,
    dpDate: true,
    maxDate: '0d',
    showAnim: "fadeIn",
    yearRange: "-100:+0",
    //dateFormat: 'yy-mm-dd'
    dateFormat: 'mm-dd-yy'
};

var loginCall;

function isLoggedin(portal) {
    loginCall = $.ajax({
        type: "POST",
        url: siteurl + 'ajax/isLoggedIn',
        dataType: 'json',
        success: function (response) {
            if (response.success == false || response.portal != portal) {
//                         window.location.href = siteurl + response.portal + "/login";
                alertbootboxcb("Your session has expired", function () {
                    window.location.href = siteurl + portal + "/login";
//                                window.location.reload();
                });

            } else {
                setTimeout('isLoggedin("' + portal + '")', 5000);
            }
//                    window.location.href = siteurl + response.portal + "/login";
        },
        error: function (response) {
        }
    });


}

function timelyUpdate(portal) {
//    loginCall.abort();
//    setTimeout('isLoggedin("'+ portal + '")', 10000);
    $.ajax({
        type: "POST",
        url: siteurl + 'cajax/timelyUpdate',
        dataType: 'json',
        success: function (response) {
            if (response.status == true) {
                if (!response.noData) {
                    var feedUpdates = response.data.feed_updates;
                    if (feedUpdates.live_updated_count > 0) {
                        $("#liveCount").html(feedUpdates.live_updated_count);
                        $("#liveCount").removeClass("hidden");
                        if ($(".js_newLiveFeeds").length > 0) {
                            $(".js_newLiveFeeds").parent().removeClass("hidden");
                        }
                    }

                    if (feedUpdates.ndorsed_updated_count > 0) {
                        $("#ndorsedCount").html(feedUpdates.ndorsed_updated_count);
                        $("#ndorsedCount").removeClass("hidden");
                        if ($(".js_newNdorsedFeeds").length > 0) {
                            $(".js_newNdorsedFeeds").parent().removeClass("hidden");
                        }
                    }

                    if (response.show_msg == true) {
                        alertbootboxcb(response.data.org_updates.msg, function () {
                            //if current url is any endorse tab then refresh it
                            var currentUrl = window.location.href;
                            var liveFeedUrl = siteurl + "endorse";
                            var liveFeedUrlIndex = siteurl + "endorse/index";
                            var ndorsedUrl = siteurl + "endorse/ndorsed";
                            var ndorserUrl = siteurl + "endorse/ndorse";
                            var statsUrl = siteurl + "endorse/stats";
                            var inactiveOrgUrl = siteurl + "client/inactiveOrg";
                            var orgStatus = response.data.org_updates.org_status;
                            var userStatus = response.data.org_updates.user_status;

                            if (orgStatus != 'active' || userStatus != 'active') {
                                window.location.href = inactiveOrgUrl;
                            }

                            if (orgStatus == 'active' && userStatus == 'active') {
                                window.location.href = liveFeedUrl;
                            }
                        });
                    } else if (response.data.accepted_request.is_accepted == true) {
                        alertbootbox(response.data.accepted_request.msg);
                    }
                }
//                         setTimeout("timelyUpdate('" + portal + "')", 10000);
            } else {
//                         alertbootboxcb(response.msg, function() {
//                                window.location.href = siteurl + "client/login";
////                                window.location.reload();
//                            });

                if (typeof response.isExpired == 'undefined') {
                    window.location.href = siteurl + "client/expire";
                } else {
                    window.location.href = siteurl + "client/checkSession";
                }
            }
        },
        error: function (response) {
        }
    });
    setTimeout("timelyUpdate('" + portal + "')", 10000);
}

function readURL(input, elementid) {
    //console.log(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e);
            $('#' + elementid).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).on("click", ".showInIframe", function (e) {
    e.preventDefault();
    var href = $(this).attr("href");
    var idforbtn = $(this).attr("id");
    if (idforbtn == "showTerms") {
        $("#iframeModal .modal-header .modal-title").text("End User License Agmt");
        $("#iframeModal .modal-header .close").text("Done");
    } else if (idforbtn == "showFaqs") {
        $("#iframeModal .modal-header .modal-title").text("FAQ");
    }
    $("#iframeModal .modal-body iframe").attr("src", href);
    $('#iframeModal').modal();
});

$(document).on("click", ".recommendLnk", function (e) {
    e.preventDefault();
    $('#recommendModal').modal();
});

$(document).on('mouseenter click', "#addNDorsePost", function () {
    $(this).find('.PopDown').removeClass('collapse');
});

$(document).on('mouseleave', "#addNDorsePost", function () {
    $(this).find('.PopDown').addClass('collapse');
});

function acceptRequestUpdate() {
    $.ajax({
        type: "POST",
        url: siteurl + 'cajax/acceptRequestUpdate',
        dataType: 'json',
        success: function (response) {
            if (response.result.status == true && response.result.showMsg) {
                alertbootboxcb(response.result.msg, function () {
                    window.location.href = siteurl + "endorse";
                });
            } else {
                if (typeof response.isExpired != 'undefined') {
                    window.location.href = siteurl + "client/expire";
                } else {

                }
            }
        }
    });

    setTimeout("acceptRequestUpdate()", 10000);
}
/* added by Babulal Prasad @02022017 **/
$(document).on('mouseenter click', ".menu-down", function () {
    $(this).find('.menu-cont').css('display', 'block');
});
$(document).on('mouseleave', ".menu-down", function () {
    $(this).find('.menu-cont').css('display', 'none');
});
/* added by Babulal Prasad @02022017 to show profile when click on user image**/
$(document).on("click", ".show-user-profile", function (event) {
    var user_id = $(this).attr("data-user-id");
    var logged_user_id = $(this).attr("data-logged-id");
    if (user_id == logged_user_id) {
        window.location.href = siteurl + "client/profile";
    } else {
        window.location.href = siteurl + "client/profile/" + user_id;
    }
});