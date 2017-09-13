//=empty object which will be initilized for validations
var objectForValidations = {}
var eventFiredStepOne = { leftEye: false, rightEye: false };
var eventFiredStepTwo = { homeState: false };
var cookieValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", docList: "", currentState: 0, finalSearchValue : ""};
// console.log(site_q)
// var emailValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", currentState: 0};
// var querystring = getQueryParams(site_q);

//=================code to check upper string
// if (getCookie("cookieValuesDetailed") != "") {
//     var getFilledDetail = JSON.parse(getCookie("cookieValuesDetailed"));
//     for(tmp in getFilledDetail){
//         if(querystring.hasOwnProperty(tmp))
//             getFilledDetail[tmp] = querystring[tmp]
//     }
//     console.log(getFilledDetail)
//     document.cookie = "cookieValuesDetailed=" + JSON.stringify(getFilledDetail) + ";  path=/";
// }else{
//     for(tmp in emailValues){
//         if(querystring.hasOwnProperty(tmp))
//             cookieValues[tmp] = querystring[tmp]
//     }
//     document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
// }
//============================



var mIndexState = {};
//=array for doctor
var doctors = new Array();
var selectedList = "";
$(function() {
    $("#step1").hide()
        
    $("#tabs").tabs({
        create: function(event, ui) {}
    });

    $('select').selectric({
        maxHeight: 300,
    });

    //=maintaining data index for this
    var mIndex = {};
    var xyz = $(".selectric-scroll ul")[0]
    $($(xyz).find("li")).each(function() {
        $(this).attr("data-index")
        mIndex[$(this).text()] = $(this).attr("data-index");
    })


    setTimeout(function() {
        var xyzState = $(".selectric-scroll ul")[2]
            
        $($(xyzState).find("li")).each(function() {
            $(this).attr("data-index")
            mIndexState[$(this).text()] = $(this).attr("data-index");
        })


    }, 0)


    //=======disable all the tabs initially other than 0
    $("#tabs").tabs("option", "disabled", [1, 2]);

    //===========
    $('#leftEye, #rightEye').selectric().on('change', function() {
        ($(this).attr("id") == "leftEye" && eventFiredStepOne.leftEye == false) ? (track.customEventFire("LeftEyePrescription"), eventFiredStepOne.leftEye = true) : "";
        ($(this).attr("id") == "rightEye" && eventFiredStepOne.rightEye == false) ? (track.customEventFire("RightEyePrescription"), eventFiredStepOne.rightEye = true) : "";
        //=====handling cookie
        if ($(this).attr("id") == "leftEye") {
            var value = $(this).val();
            if($(this).val() > 0)
                value = "+" + $(this).val();
            
            cookieValues.leftEye = mIndex[value]
            document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
        }
        if ($(this).attr("id") == "rightEye") {
            var value = $(this).val();
            if($(this).val() > 0)
                value = "+" + $(this).val();
            cookieValues.rightEye = mIndex[value]
            document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
        }

        $("#leftSelected").text($("#leftEye").val())
        $("#rightSelected").text($("#rightEye").val())
        objectForValidations.formOneValidation();
    });

    $("#tabs").tabs({
        show: { effect: "fade", duration: 200 },
        activate: function(event, ui) {
            track.customEventFire("firePageView");
            var checkIndex = getIndex();
            cookieValues.currentState = checkIndex;
            document.cookie = "cookieValuesDetailed="+JSON.stringify(cookieValues)+";  path=/";
            if (checkIndex == 0){
                eventFiredStepOne = { leftEye: false, rightEye: false };

            }
            if (checkIndex == 1)
                eventFiredStepTwo = { homeState: false };
            if (checkIndex == 2){
                document.getElementById("leftSelected").innerHTML = ($("#leftEye").val() > 0) ? "+"+ $("#leftEye").val(): $("#leftEye").val();
                document.getElementById("rightSelected").innerHTML = ($("#rightEye").val() > 0) ? "+"+ $("#rightEye").val(): $("#rightEye").val();
                // $("#leftSelected").text($("#leftEye").val())
                // $("#rightSelected").text($("#rightEye").val())
            }
        }
    });


    $("#step1").animate({ opacity: 1 }, 1500)

    if (getCookie("cookieValuesDetailed") != "") {
        var getFilledDetail = JSON.parse(getCookie("cookieValuesDetailed"));
        fillTheDetailandCheck(getFilledDetail);
    }



});

function enablityTabOption(whichone){
    for(tmp in whichone){
        $(".steps").find("a[href='#step"+whichone[tmp]+"'] div").addClass("done");
        $("#tabs").tabs("enable", whichone[tmp]);
    }
}

function selectingCookieSelectedList(){
  var selectedListCookie = getCookie("selectedList");
  var removeEx = new RegExp("'<div", 'g');
  selectedListCookie = selectedListCookie.replace(removeEx, '<div');
  var removeEx = new RegExp("/div>'", 'g');
  selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
  return selectedListCookie;
}

function fillTheDetailandCheck(getFilledDetail) {
    if (getFilledDetail.currentState == 2) {
        enablityTabOption([1,2]);

    } else if (getFilledDetail.currentState == 1) {
        enablityTabOption([1])
    }
    if (getCookie("selectedList") != "") {
        if(getFilledDetail.currentState > 0)
            enablityTabOption([1]);
        var selectedListCookie = selectingCookieSelectedList();
        // var removeEx = new RegExp("'<div", 'g');
        // selectedListCookie = selectedListCookie.replace(removeEx, '<div');
        // var removeEx = new RegExp("/div>'", 'g');
        // selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
        $(".reviews .desc").last().html(selectedListCookie);
        selectedList = getCookie("selectedList");
    }

    //====activating current state for the tab
    $("#tabs").tabs({
        active: getFilledDetail.currentState
    });

    if (getFilledDetail.leftEye != "") {
        $('#leftEye').prop('selectedIndex', getFilledDetail.leftEye).selectric('refresh');
        cookieValues.leftEye = getFilledDetail.leftEye;
    }
    if (getFilledDetail.rightEye != "") {
        $('#rightEye').prop('selectedIndex', getFilledDetail.rightEye).selectric('refresh');
        cookieValues.rightEye = getFilledDetail.rightEye;
    }
    if (getFilledDetail.homeStateId != "") {
        $('#searchDoctor').prop('selectedIndex', getFilledDetail.homeStateId).selectric('refresh');
        cookieValues.homeStateId = getFilledDetail.homeStateId;
        cookieValues.homeState = getFilledDetail.homeState;
        getDoctorList(getFilledDetail.homeState);
        if(typeof docListthValue == "undefined")
            $(".findDoctor").removeClass("loader");
    }
    if (getFilledDetail.docList != "") {
        var selectedListCookie = selectingCookieSelectedList();
        $("#findyourdoctor").removeClass("disableThis");
        //$("#docListth").val("arc")
        $("#SearchDoc").removeClass("disableThis")
        $("#SearchDoc ul li").html(selectedListCookie);
        $("#SearchDoc ul li").append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>');
        $("#docListHidden").val(getFilledDetail.docList);
        $(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
        //$(".findDoctor").addClass("optionSelected");
        if (getFilledDetail.currentState == 2) {
            $("#leftSelected").text($("#leftEye").val())
            $("#rightSelected").text($("#rightEye").val())
        }
        if(typeof docListthValue != "undefined" && docListthValue)
            $('.findDoctor').removeClass('loader');
        cookieValues.docList = getFilledDetail.docList;
        cookieValues.finalSearchValue = getFilledDetail.finalSearchValue;

        
    }
    document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
}


//===return the index of active tab
function getIndex() {
    return $("ul li.ui-state-active").index();
}

//=bold the selected string as per regular expression
function boldString(str, find) {
    var re = new RegExp(find, 'g');
    var rei = new RegExp(find, 'i');
    if (str.match(rei) != null && str.match(rei).length)
        return str.replace(rei, '<b>' + str.match(rei)[0] + '</b>');
    return str.replace(re, '<b>' + find + '</b>');
}

function responsive_typeahead(data, term) {
    //console.log(data)
    var address = data.address[0] + ', ' + data.address[1] + ' ' + data.address[2];
    var name = data.name;
    var clinic_name = data.clinic_name;
    addressHidden = address;
    address = address;
    var docId = data.id;

    return ('<li class="doclistSelect1">' +
        '<div class="searchName">' + name + '</div>' +
        '<div class="searchHos">' + clinic_name + '</div>' +
        '<div class="searchCity" >' + address + '</div>' +
        '<div class="disableThis">' +
        '<div class="searchNameHidden">' + data.name + '</div>' +
        '<div class="searchHosHidden">' + data.clinic_name + '</div>' +
        '<div class="searchCityHidden">' + addressHidden + '</div>' +
        '<div class="searchId" style="display:none">' + docId + '</div>' +
        '</div>' +
        '</li>');
}



function bloodhound() {

    var results = new Bloodhound({
        datumTokenizer: function(data) {

            return Bloodhound.tokenizers.whitespace(data.name)

            .concat(Bloodhound.tokenizers.whitespace(data.clinic_name))

            .concat(Bloodhound.tokenizers.whitespace(data.city))

            .concat(Bloodhound.tokenizers.whitespace(data.state))

            .concat(Bloodhound.tokenizers.whitespace(data.postcode))

            ;

        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: doctors

    });

    results.initialize();

    return results;

}

function typeahead() {
    $doctor_searches = $("#docListth")
    $doctor_searches.val("")
    if (!$doctor_searches.length)
        return;

    $doctor_searches.each(function(index, doctor_search) {

        var $doctor_search = $(doctor_search);

        $doctor_search.typeahead('destroy');

        $doctor_search.typeahead({
            classNames: {
                menu: 'tt-menu1'
            },
            hint: true,
            highlight: true,
            minLength: 2

        }, {
            name: 'results',
            displayKey: 'results',
            source: bloodhound().ttAdapter(),
            limit: 100,
            templates: {
                suggestion: function(data) {
                    return '<ul class="doclistSelect">' + responsive_typeahead(data) + '</ul>';

                },
                empty: [
                    ''
                ].join('\n')

            },
            

        }).on('typeahead:select', function(e, data) {
            cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        }).on('typeahead:change', function(e, data) {
            cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        })
        

    });

}

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}


function getDoctorList(state) {
    $("#docList1").on("keyup", function() {
        if ($(this).val().length > 1) {
            $("#docList").val($(this).val());
            //var abc = $(this).val().split(" ");

            $("#docList").customcomplete("search", $(this).val().trim());
        } else {
            removeDocList();
        }
    });
    if(typeof docListthValue != "undefined" && docListthValue)
        $(".listLink").addClass("disableThis");
    $(".findDoctor").addClass("loader")
    $.ajax({
        type: "get",
        url: "https://api.hubblecontacts.com/v1/docs/search.js",
        data: { state: state },
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSONP',
        success: function(res) {
            if(typeof docListthValue == "undefined")
                $("#findyourdoctor, .listLink").removeClass("disableThis");
            else{
                $("#findyourdoctor").removeClass("disableThis");
            }
            $(".findDoctor").removeClass("loader");
            console.log("success");
            doctors = res.data.docs;
            $.each(doctors, function(index, value) {
                doctors[index].label = " " + doctors[index].name + " " + doctors[index].clinic_name + " " + doctors[index].address_1 + " " + doctors[index].city + " " + doctors[index].phone + " " + doctors[index].postcode;
                if (doctors[index].name == undefined) {
                    doctors[index].name = '';
                }
                if (doctors[index].clinic_name == undefined || doctors[index].clinic_name == '') {
                    doctors[index].clinic_name = doctors[index].address_1;
                }

                if (doctors[index].city == undefined) {
                    doctors[index].city = '';
                }

                if (doctors[index].state == undefined) {
                    doctors[index].state = '';
                }

                if (doctors[index].postcode == undefined) {
                    doctors[index].postcode = '';
                }

                if (doctors[index].phone == undefined) {
                    doctors[index].phone = '';
                }

                doctors[index].address = [
                    doctors[index].city,
                    doctors[index].state,
                    doctors[index].postcode

                ]

            });
            bloodhound();

            typeahead();
            if(typeof docListthValue != "undefined" && docListthValue){
                $("#docListth").focus();
            }

        },
        timeout: 15000,
        error: function(res) {
            console.log(res)
        }

    });
}

//=object strrt for validations
objectForValidations.formOneValidation = function() {
    $('.left_eye').removeClass('error');
    $('.right_eye').removeClass('error');
    if (($("#leftEye").val() != null && $("#leftEye").val() != "") && ($("#rightEye").val() != null && $("#rightEye").val() != "")) {
        $(".nextStepButton[data-CrStepNo='0']").removeClass("disableNext");
        $('.form_error_msg').addClass('hide');
        return true
    }
    setTimeout(function() {
        if (!$(".form_error_msg").hasClass("hide")) {
            if (($("#leftEye").val() == null || $("#leftEye").val() == "")) {
                $('.left_eye').addClass('error');
            }
            if (($("#rightEye").val() == null || $("#rightEye").val() == "")) {
                $('.right_eye').addClass('error');
            }
        }
    }, 10);
    return false;
}

objectForValidations.formTwoValidation = function() {
    if ($("#docListHidden").val() != "") {
        $(".steps").find("a[href='#step2'] div").addClass("done");
        var selectedListCookie = selectingCookieSelectedList();
        $(".reviews .desc").last().html(selectedListCookie);
        $("#leftSelected").text($("#leftEye").val())
        $("#rightSelected").text($("#rightEye").val())
        return true;
    }
    return false;
}


function removeDocList() {
    var $ulforSearch = $(".tt-menu1 ul")
    $(".tt-menu1").addClass("disableThis");
    $ulforSearch.each(function() {
        $(this).html("")
    })


    if ($("#docListHidden").val() != "")
        $(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
}

$(document).on('keyup', '#docListth', function(ev) {
    $(".tt-menu1").removeClass("disableThis");
    if($(this).val().trim().length > 0 && typeof docListthValue != "undefined" && docListthValue)
        $(".listLink").removeClass("disableThis");
    else if(typeof docListthValue != "undefined" && docListthValue)
        $(".listLink").addClass("disableThis");
});



//========clicking of next button
$(document).on("click", ".nextStepButton", function(e) {
    console.log(e)
    var currentIndex = getIndex();
    if (currentIndex == 0) {
        var formValidation = objectForValidations.formOneValidation();
        if (formValidation) {
            $(".steps").find("a[href='#step1'] div").addClass("done");
            //==================tracking events
            
            track.customEventFire("SubscribeRxToSubscribeDoctor,SubscribeDoctorPageVisit");
            
            //}
        } else {
            $('.form_error_msg').removeClass('hide');
        }
    } else if (currentIndex == 1) {
        var formValidation = objectForValidations.formTwoValidation();
        track.customEventFire("SubscribeDoctorToSubscribeReview,SubscribeReviewPageVisit");
    }
    var activateStepNo = parseInt($(this).attr("data-EnStepNo"))
        //var disableStepNo = $(this).attr("data-DisStepNo")
    if (currentIndex < 2 && formValidation == true) {
        //var rel = $(this).attr('rel');
        //track.customEventFire(rel);
        $("#tabs").tabs("enable", activateStepNo);
        $("#tabs").tabs({
            active: activateStepNo
        });
        $('html, body').animate({
            scrollTop: $("header").offset().top
        }, 1000);
    }
})

var dragging = false;
//=======on click of li on step 2
$(document).on("click touchend", ".doclistSelect", function(e) {

    e.stopPropagation();
    e.preventDefault();
    if (dragging == false) {
        cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        var htmlSelected = $(this).find(".disableThis").html();
        selectedList = htmlSelected;

        var rStrong = new RegExp('<strong class="tt-highlight">|</strong>', "g");
        selectedList = selectedList.replace(rStrong, "");
        
        var rAmp = new RegExp('&amp;', "g");
        selectedList = selectedList.replace(rAmp, "&");
        
        document.cookie = 'selectedList=' + "'"+selectedList+"'" + '; path=/';
        var Docid = $($(htmlSelected)[3]).text();
        console.log(Docid + " hiddenId")
        $("#docListHidden").val(Docid);
        cookieValues.docList = Docid
        document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
        //htmlSelected = $(htmlSelected).append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>')
        $("#SearchDoc").removeClass("disableThis")
        $("#SearchDoc ul li").html("");
        $("#SearchDoc ul li").html(selectedList)
            //removeDocList();
        $(".tt-menu1").addClass("disableThis");
        $(".tt-menu1").css("display", "none")

        
        $("#docListth").blur();
        //=adding delete button
        $("#SearchDoc ul li").append('<div class="deleteSearch"><img src="images/delete_icon.png" alt="" /></div>');
        $(".findDoctor").addClass("optionSelected");
        if ($("#docListHidden").val() != ""){
            
            $(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");    
            
        }
        if(typeof docListthValue != "undefined" && docListthValue)
            $(".listLink").addClass("disableThis");
        track.customEventFire("DoctorSelected");

    }
})


//===========drag and drop handling for mobile
$(document).on("touchmove", ".doclistSelect", function(e) {
    dragging = true;
});

$(document).on("touchend", ".doclistSelect", function(e) {
    if (dragging)
        return;
});

$(document).on("touchstart", ".doclistSelect", function(e) {
    dragging = false;
});

//===========drag and drop handling for mobile


$(document).on("click", ".deleteSearch", function() {
    $("#SearchDoc").addClass("disableThis")
    $("#SearchDoc ul li").html("");
    $("#docListHidden").val("")
    $(".nextStepButton[data-CrStepNo='1']").addClass("disableThis");
    if ($(".steps").find("a[href='#step2'] div").hasClass("done")) {
        $(".steps").find("a[href='#step2'] div").removeClass("done");
        $("#tabs").tabs("option", "disabled", [2]);
    }
    cookieValues.docList = "";
    document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
    document.cookie = "selectedList=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    //removeDocList();
    if($(".tt-menu1 .tt-dataset-results ul").length > 0){
        $(".tt-menu1").removeClass("disableThis");
        $(".tt-menu1").css("display", "block");
    }else
        $('#docListth').typeahead('val', cookieValues.finalSearchValue).focus();
    $(".findDoctor").removeClass("optionSelected");

    if(typeof docListthValue != "undefined" && docListthValue && $("#docListth").val().trim().length > 0){
        $(".listLink").removeClass("disableThis");
    }else if(typeof docListthValue != "undefined" && docListthValue && $("#docListth").val().trim().length == 0){
        $(".listLink").addClass("disableThis");
    }

})

//========clicking of edit button
$(document).on("click", ".edit", function() {
    $("#tabs").tabs("option", "disabled", []);
    $('.' + $(this).attr('rel')).click();
})

//========clicking to checkout button
$(document).on("click", ".goToCheckout", function() {
    var bridgeUrl = bridgeUrlSelector;
    var doctor_id = $("#docListHidden").val();
    var right_eye = $("#leftEye").val();
    var left_eye = $("#rightEye").val();
    var attributeValues = "&doctor_id=" + doctor_id + "&right_power=" + right_eye + "&left_power=" + left_eye;
    var utm_parms = abanalytics.setUtmParams("returnParams", utmToken);
    checkoutURL = bridgeUrl + utm_parms + attributeValues;
    document.location.href = checkoutURL;
})

$(document).on("change", "#searchDoctor", function() {
    (eventFiredStepTwo.homeState == false) ? (track.customEventFire("DoctorStateSelected"), eventFiredStepTwo.homeState = true) : "";
    var SelectedState = $("#searchDoctor").val();
    //var cookieValues = {leftEye:"", rightEye: "", homeStateId: "", homeState : "", docList: "", currentState : 0};
    cookieValues.homeStateId = mIndexState[SelectedState]
    cookieValues.homeState = SelectedState;
    document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
    $(".deleteSearch").click();
    getDoctorList(SelectedState);
});

$(document).on("click", "#doctorIsnt", function() {
    track.customEventFire("DoctorNotListed");
    $("#doctorModal").fadeIn();
});

$(document).on("click", ".closeDialog", function() {
    $(".modalForm").removeClass("error")
    $("#modalError").addClass("hide");
    $("#modalErrorOne").addClass("hide");
    $("#doctorModal").fadeOut();
})

$(document).on("click", "body", function(e) {
    if ($("#doctorModal").css("display") == "block" && $(e.target).attr("class") == "overlayBg") {
        $(".modalForm").removeClass("error")
        $("#modalError").addClass("hide");
        $("#modalErrorOne").addClass("hide");
        $("#doctorModal").fadeOut();
    }
})

objectForValidations.formThreeModalValidation = function(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, checkall) {
    //===========docname handling
    if (docName != "" && docName.length >= minLengthReq[0]) {
        BdocName = 1;
        $("input[name='doctorName']").removeClass("error")
    } else if (checkall == 1)
        $("input[name='doctorName']").addClass("error")

    //===========ClinicName handling
    if (ClinicName != "" && ClinicName.length >= minLengthReq[1]) {
        BClinicName = 1;
        $("input[name='clinicName']").removeClass("error")
    } else if (checkall == 1)
        $("input[name='clinicName']").addClass("error")

    //===========docCity handling
    if (docCity != "" && docCity.length >= minLengthReq[2]) {
        BdocCity = 1;
        $("input[name='docCity']").removeClass("error")
    } else if (checkall == 1)
        $("input[name='docCity']").addClass("error")

    var myValues = BdocName + "" + BClinicName + "" + BdocCity;
    return myValues;
}

var minLengthReq = new Array(5, 5, 3);
var validCombination = new Array("110", "011", "101", "111");

$(document).on("click", "#submitDoc", function() {
    var docName = $("input[name='doctorName']").val().trim();
    var ClinicName = $("input[name='clinicName']").val().trim();
    var docCity = $("input[name='docCity']").val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    var myValues = objectForValidations.formThreeModalValidation(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, 1);

    //myValues = parseInt(myValues);

    if ($.inArray(myValues, validCombination) > -1){
        track.customEventFire("DoctorAddedAndSelected");
        track.customEventFire("DoctorSelected");
        var newCreatedId = getNewlyCreatedDocId(docName, ClinicName, docCity);
    }
    else {
        var errorDisplay = "";
        $(".modalForm").each(function() {
            
            errorDisplay += $(this).val().trim().length;
            
        });
        //=-=========check which error  msg to show
        var abc = new RegExp("0", "g");
        if (errorDisplay.match(abc) != null && errorDisplay.match(abc).length >= 2) {
            $("#modalErrorOne").addClass("hide");
            $("#modalError").removeClass("hide");
        } else {
            $("#modalError").addClass("hide");
            $("#modalErrorOne").removeClass("hide");
        }
    }
});

$(document).on("keyup", ".modalForm", function() {
    var $name = $(this).attr("name");
    var InputName = $("input[name='" + $name + "']").val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    if ($name == "doctorName")
        var myValues = objectForValidations.formThreeModalValidation(InputName, "", "", BdocName, "", "", 0);
    else if ($name == "clinicName")
        var myValues = objectForValidations.formThreeModalValidation("", InputName, "", "", BClinicName, "", 0);
    else if ($name == "docCity")
        var myValues = objectForValidations.formThreeModalValidation("", "", InputName, "", "", BdocCity, 0);

    if (myValues == 1 && $("input[name='" + $name + "']").hasClass("error")) {
        $("input[name='" + $name + "']").removeClass("error")
    }

    //====enable disable button
    var docName = $("input[name='doctorName']").val().trim();
    var ClinicName = $("input[name='clinicName']").val().trim();
    var docCity = $("input[name='docCity']").val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    var myValues = objectForValidations.formThreeModalValidation(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, 0);

    if ($.inArray(myValues, validCombination) > -1) {
        $("#submitDoc").removeClass("disableNext");
        $("#modalError").addClass("hide");
        $("#modalErrorOne").addClass("hide");
        $(".modalForm").removeClass("error");
    } else
        $("#submitDoc").addClass("disableNext");
});

function getNewlyCreatedDocId(docName, ClinicName, docCity) {
    var s = {
        name: docName,
        clinic_name: ClinicName,
        city: docCity,
        state: $("#searchDoctor").val()
            //state: "MD"
    };
    $.ajax({
        type: "post",
        url: "https://api.hubblecontacts.com/v1/docs/create.js",
        dataType: "JSONP",
        data: s,
        success: function(res) {
            if (res.status == "success") {
                var docId = res.data.doc.id;
                $("#docListHidden").val(docId);
                var ElementAdded = '<div class ="searchNameHidden">' + docName + '</div>';
                ElementAdded += '<div class = "searchHosHidden">' + ClinicName + '</div>';
                ElementAdded += '<div class = "searchCityHidden" >' + docCity + '</div>';
                ElementAdded += '<div class = "searchId" style="display:none">' + docId + '</div >';
                selectedList = ElementAdded;
                document.cookie = "selectedList=" + ElementAdded + "; path=/";
                ElementAdded += '<div class = "deleteSearch" ><img src = "images/delete_icon.png" alt = "" /></div>';
                $("#SearchDoc").removeClass("disableThis")
                $("#SearchDoc ul li").html("");
                $("#SearchDoc ul li").html(ElementAdded);
                cookieValues.docList = docId
                cookieValues.finalSearchValue = "";
                document.cookie = "cookieValuesDetailed=" + JSON.stringify(cookieValues) + ";  path=/";
                
                //removeDocList();
                $(".tt-menu1").addClass("disableThis");
                $(".tt-menu1").css("display", "none")
                if ($("#docListHidden").val() != "")
                    $(".nextStepButton[data-CrStepNo='1']").removeClass("disableThis");
                $("#doctorModal").fadeOut();
                $(".modalForm").removeClass("error")
                $(".modalForm").each(function() {
                    $(this).val("")
                })
                $("#submitDoc").addClass("disableNext");
                if(typeof docListthValue != "undefined" && docListthValue)
                    $(".listLink").addClass("disableThis");
            }
        },
        error: function(t) {
            console.log("error"), console.log(t)
        }
    })
}

// $(document).on("click", "#archit", function(){
//     var email_params = $.extend(true, {}, cookieValues);
//     delete email_params["finalSearchValue"]
//     for(tmp in email_params){
//         if(email_params[tmp] == "")
//             delete email_params[tmp]
//     }
//     var xyz = window.location.href + "&" + $.param(email_params)
//     console.log(xyz)
// })
