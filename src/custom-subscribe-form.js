import $ from 'jquery';
window.jQuery = window.$ = $;
import selectric from 'jquery-selectric';
require('./../js/jquery-ui.min.js');
import abanalytics from './abanalytics.js';
const getCookie = abanalytics.getCookie;
import track from './track.js';
import Bloodhound from 'bloodhound-js';
import typeahead from 'typeahead';
import './../js/jquery.typeahead.js';

class custom_subscribe_form{
    constructor(){
        this.objectForValidations = {};
        this.eventFiredStepOne = { leftEye: false, rightEye: false };
        this.eventFiredStepTwo = { homeState: false };
        this.cookieValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", docList: "", currentState: 0, finalSearchValue : ""};
        this.doctors = new Array();
        this.mIndex = {};
        this.selectedList = "";
        //========initialize tab and selectric
        $("#step1").hide()
        $("#tabs").tabs({
            create(event, ui) {}
        });
        $('select').selectric({
            maxHeight: 300,
        });
        //====================================
        this.extendedFunction();
        this.init();
        this.changingSelectric();
        this.nextButtonClick();
        this.doctorChange();
    }

    getIndex(){
        return $("ul li.ui-state-active").index();
    }

    doctorChange(){
        $(document).on("change", "#searchDoctor", () => {
            (this.eventFiredStepTwo.homeState == false) ? (track.customEventFire("DoctorStateSelected"), this.eventFiredStepTwo.homeState = true) : "";
            const SelectedState = $("#searchDoctor").val();
            //var cookieValues = {leftEye:"", rightEye: "", homeStateId: "", homeState : "", docList: "", currentState : 0};
            this.cookieValues.homeStateId = mIndexState[SelectedState]
            this.cookieValues.homeState = SelectedState;
            document.cookie = `cookieValuesDetailed=${JSON.stringify(this.cookieValues)};  path=/`;
            $(".deleteSearch").click();
            this.getDoctorList(SelectedState);
        });    
    }

    getDoctorList(state) {
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
            data: { state },
            contentType: 'application/json; charset=utf-8',
            dataType: 'JSONP',
            success(res) {
                if(typeof docListthValue == "undefined")
                    $("#findyourdoctor, .listLink").removeClass("disableThis");
                else{
                    $("#findyourdoctor").removeClass("disableThis");
                }
                $(".findDoctor").removeClass("loader");
                console.log("success");
                doctors = res.data.docs;
                $.each(doctors, (index, value) => {
                    doctors[index].label = ` ${doctors[index].name} ${doctors[index].clinic_name} ${doctors[index].address_1} ${doctors[index].city} ${doctors[index].phone} ${doctors[index].postcode}`;
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

                typeaheadcheck();
                if(typeof docListthValue != "undefined" && docListthValue){
                    $("#docListth").focus();
                }

            },
            timeout: 15000,
            error(res) {
                console.log(res)
            }

        });
    }
    
    //===========for selected list
    selectingCookieSelectedList(){
      let selectedListCookie = getCookie("selectedList");
      var removeEx = new RegExp("'<div", 'g');
      selectedListCookie = selectedListCookie.replace(removeEx, '<div');
      var removeEx = new RegExp("/div>'", 'g');
      selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
      return selectedListCookie;
    }

    init(){
        //=maintaining data index for this
        const mIndex        = {};
        const xyz           = $(".selectric-scroll ul")[0];
        
        $($(xyz).find("li")).each(function() {
            $(this).attr("data-index")
            mIndex[$(this).text()] = $(this).attr("data-index");
        })

        this.mIndex = mIndex;

        setTimeout(() => {
            const xyzState = $(".selectric-scroll ul")[2];
            const mIndexState   = {}; 
            $($(xyzState).find("li")).each(function() {
                $(this).attr("data-index")
                mIndexState[$(this).text()] = $(this).attr("data-index");
            })


        }, 0)

        $("#tabs").tabs("option", "disabled", [1, 2]);

        //===========
        

        $("#tabs").tabs({
            show: { effect: "fade", duration: 200 },
            activate : (event, ui) => {
                track.customEventFire("firePageView");
                const checkIndex = this.getIndex();
                this.cookieValues.currentState = checkIndex;
                document.cookie = `cookieValuesDetailed=${JSON.stringify(this.cookieValues)};  path=/`;
                if (checkIndex == 0){
                    eventFiredStepOne = { leftEye: false, rightEye: false };

                }
                if (checkIndex == 1)
                    this.eventFiredStepTwo = { homeState: false };
                if (checkIndex == 2){
                    document.getElementById("leftSelected").innerHTML = ($("#leftEye").val() > 0) ? `+${$("#leftEye").val()}`: $("#leftEye").val();
                    document.getElementById("rightSelected").innerHTML = ($("#rightEye").val() > 0) ? `+${$("#rightEye").val()}`: $("#rightEye").val();
                    // $("#leftSelected").text($("#leftEye").val())
                    // $("#rightSelected").text($("#rightEye").val())
                }
            }
        });


        $("#step1").animate({ opacity: 1 }, 1500)

        if (getCookie("cookieValuesDetailed") != "") {
            const getFilledDetail = JSON.parse(getCookie("cookieValuesDetailed"));
            this.fillTheDetailandCheck(getFilledDetail);
        }
    }

    extendedFunction(){
        this.objectForValidations.formOneValidation = function(){
            $('.left_eye').removeClass('error');
            $('.right_eye').removeClass('error');
            if (($("#leftEye").val() != null && $("#leftEye").val() != "") && ($("#rightEye").val() != null && $("#rightEye").val() != "")) {
                $(".nextStepButton[data-CrStepNo='0']").removeClass("disableNext");
                $('.form_error_msg').addClass('hide');
                return true
            }
            setTimeout(() => {
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

        this.objectForValidations.formTwoValidation = function(){
            if ($("#docListHidden").val() != "") {
                $(".steps").find("a[href='#step2'] div").addClass("done");
                const selectedListCookie = selectingCookieSelectedList();
                $(".reviews .desc").last().html(selectedListCookie);
                $("#leftSelected").text($("#leftEye").val())
                $("#rightSelected").text($("#rightEye").val())
                return true;
            }
            return false;
        }

        this.objectForValidations.formThreeModalValidation = function(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, checkall){
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

            const myValues = `${BdocName}${BClinicName}${BdocCity}`;
            return myValues;
        }
    }

    enablityTabOption(whichone){
        for(let tmp in whichone){
            $(".steps").find(`a[href='#step${whichone[tmp]}'] div`).addClass("done");
            $("#tabs").tabs("enable", whichone[tmp]);
        }
    }

    fillTheDetailandCheck(getFilledDetail) {
        if (getFilledDetail.currentState == 2) {
            this.enablityTabOption([1,2]);

        } else if (getFilledDetail.currentState == 1) {
            this.enablityTabOption([1])
        }
        if (getCookie("selectedList") != "") {
            if(getFilledDetail.currentState > 0)
                this.enablityTabOption([1]);
            var selectedListCookie = selectingCookieSelectedList();
            $(".reviews .desc").last().html(selectedListCookie);
            selectedList = getCookie("selectedList");
        }

        //====activating current state for the tab
        $("#tabs").tabs({
            active: getFilledDetail.currentState
        });

        if (getFilledDetail.leftEye != "") {
            $('#leftEye').prop('selectedIndex', getFilledDetail.leftEye).selectric('refresh');
            this.cookieValues.leftEye = getFilledDetail.leftEye;
        }
        if (getFilledDetail.rightEye != "") {
            $('#rightEye').prop('selectedIndex', getFilledDetail.rightEye).selectric('refresh');
            this.cookieValues.rightEye = getFilledDetail.rightEye;
        }
        if (getFilledDetail.homeStateId != "") {
            $('#searchDoctor').prop('selectedIndex', getFilledDetail.homeStateId).selectric('refresh');
            this.cookieValues.homeStateId = getFilledDetail.homeStateId;
            this.cookieValues.homeState = getFilledDetail.homeState;
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
            this.cookieValues.docList = getFilledDetail.docList;
            this.cookieValues.finalSearchValue = getFilledDetail.finalSearchValue;

            
        }
        document.cookie = `cookieValuesDetailed=${JSON.stringify(this.cookieValues)};  path=/`;
    }

    changingSelectric(){
        $('#leftEye, #rightEye').selectric().on('change', () => {
            ($(this).attr("id") == "leftEye" && this.eventFiredStepOne.leftEye == false) ? (track.customEventFire("LeftEyePrescription"), domReady.eventFiredStepOne.leftEye = true) : "";
            ($(this).attr("id") == "rightEye" && this.eventFiredStepOne.rightEye == false) ? (track.customEventFire("RightEyePrescription"), domReady.eventFiredStepOne.rightEye = true) : "";
            //=====handling cookie
            if ($(this).attr("id") == "leftEye") {
                var value = $(this).val();
                if($(this).val() > 0)
                    value = `+${$(this).val()}`;
                
                domReady.cookieValues.leftEye = this.mIndex[value]
                document.cookie = `cookieValuesDetailed=${JSON.stringify(domReady.cookieValues)};  path=/`;
            }
            if ($(this).attr("id") == "rightEye") {
                var value = $(this).val();
                if($(this).val() > 0)
                    value = `+${$(this).val()}`;
                domReady.cookieValues.rightEye = this.mIndex[value]
                document.cookie = `cookieValuesDetailed=${JSON.stringify(domReady.cookieValues)};  path=/`;
            }

            $("#leftSelected").text($("#leftEye").val())
            $("#rightSelected").text($("#rightEye").val())
            this.objectForValidations.formOneValidation();
        });
    }

    //========clicking of next button
    nextButtonClick(){
         $(document).on("click", ".nextStepButton", (e) => {
            const currentIndex = this.getIndex();
            console.log(currentIndex)
            if (currentIndex == 0) {
                var formValidation = this.objectForValidations.formOneValidation();
                
                if (formValidation) {
                    $(".steps").find("a[href='#step1'] div").addClass("done");
                    track.customEventFire("SubscribeRxToSubscribeDoctor,SubscribeDoctorPageVisit");
                } else {
                    $('.form_error_msg').removeClass('hide');
                }
            } else if (currentIndex == 1) {
                var formValidation = this.objectForValidations.formTwoValidation();
                track.customEventFire("SubscribeDoctorToSubscribeReview,SubscribeReviewPageVisit");
            }
            const activateStepNo = parseInt($(e.currentTarget).attr("data-EnStepNo"));
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
    }
   
}







/*let objectForValidations = {}
let eventFiredStepOne = { leftEye: false, rightEye: false };
let eventFiredStepTwo = { homeState: false };
let cookieValues = { leftEye: "", rightEye: "", homeStateId: "", homeState: "", docList: "", currentState: 0, finalSearchValue : ""};
let {leftEye, rightEye} = cookieValues;
const mIndexState = {};
let doctors = new Array();
let selectedList = "";*/

$(() => {
    let domReady = new custom_subscribe_form();
    
    /*$('#leftEye, #rightEye').selectric().on('change', function() {
        ($(this).attr("id") == "leftEye" && domReady.eventFiredStepOne.leftEye == false) ? (track.customEventFire("LeftEyePrescription"), domReady.eventFiredStepOne.leftEye = true) : "";
        ($(this).attr("id") == "rightEye" && domReady.eventFiredStepOne.rightEye == false) ? (track.customEventFire("RightEyePrescription"), domReady.eventFiredStepOne.rightEye = true) : "";
        //=====handling cookie
        if ($(this).attr("id") == "leftEye") {
            var value = $(this).val();
            if($(this).val() > 0)
                value = `+${$(this).val()}`;
            
            domReady.cookieValues.leftEye = domReady.mIndex[value]
            document.cookie = `cookieValuesDetailed=${JSON.stringify(domReady.cookieValues)};  path=/`;
        }
        if ($(this).attr("id") == "rightEye") {
            var value = $(this).val();
            if($(this).val() > 0)
                value = `+${$(this).val()}`;
            domReady.cookieValues.rightEye = domReady.mIndex[value]
            document.cookie = `cookieValuesDetailed=${JSON.stringify(domReady.cookieValues)};  path=/`;
        }

        $("#leftSelected").text($("#leftEye").val())
        $("#rightSelected").text($("#rightEye").val())
        domReady.objectForValidations.formOneValidation();
    });*/

});

/*function enablityTabOption(whichone){
    for(let tmp in whichone){
        $(".steps").find(`a[href='#step${whichone[tmp]}'] div`).addClass("done");
        $("#tabs").tabs("enable", whichone[tmp]);
    }
}*/

/*function selectingCookieSelectedList(){
  let selectedListCookie = getCookie("selectedList");
  var removeEx = new RegExp("'<div", 'g');
  selectedListCookie = selectedListCookie.replace(removeEx, '<div');
  var removeEx = new RegExp("/div>'", 'g');
  selectedListCookie = selectedListCookie.replace(removeEx, '/div>');
  return selectedListCookie;
}*/

/*function fillTheDetailandCheck(getFilledDetail) {
    if (getFilledDetail.currentState == 2) {
        enablityTabOption([1,2]);

    } else if (getFilledDetail.currentState == 1) {
        enablityTabOption([1])
    }
    if (getCookie("selectedList") != "") {
        if(getFilledDetail.currentState > 0)
            enablityTabOption([1]);
        var selectedListCookie = selectingCookieSelectedList();
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
    document.cookie = `cookieValuesDetailed=${JSON.stringify(cookieValues)};  path=/`;
}
*/

//===return the index of active tab
/*function getIndex() {
    return $("ul li.ui-state-active").index();
}*/

//=bold the selected string as per regular expression
function boldString(str, find) {
    const re = new RegExp(find, 'g');
    const rei = new RegExp(find, 'i');
    if (str.match(rei) != null && str.match(rei).length)
        return str.replace(rei, `<b>${str.match(rei)[0]}</b>`);
    return str.replace(re, `<b>${find}</b>`);
}

function responsive_typeahead(data, term) {
    
    let address = `${data.address[0]}, ${data.address[1]} ${data.address[2]}`;

    const name = data.name;
    const clinic_name = data.clinic_name;
    let addressHidden = address;
    address = address;
    const docId = data.id;

    return (`<li class="doclistSelect1"><div class="searchName">${name}</div><div class="searchHos">${clinic_name}</div><div class="searchCity" >${address}</div><div class="disableThis"><div class="searchNameHidden">${data.name}</div><div class="searchHosHidden">${data.clinic_name}</div><div class="searchCityHidden">${addressHidden}</div><div class="searchId" style="display:none">${docId}</div></div></li>`);
}



function bloodhound() {

    const results = new Bloodhound({
        datumTokenizer(data) {

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

function typeaheadcheck() {
    var $doctor_searches = $("#docListth")
    $doctor_searches.val("")
    console.log($doctor_searches.length)
    if (!$doctor_searches.length)
        return;

    $doctor_searches.each((index, doctor_search) => {
        
        const $doctor_search = $(doctor_search);
        
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
                suggestion(data) {
                    return `<ul class="doclistSelect">${responsive_typeahead(data)}</ul>`;

                },
                empty: [
                    ''
                ].join('\n')

            },
            

        }).on('typeahead:select', (e, data) => {
            cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        }).on('typeahead:change', (e, data) => {
            cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        })
        

    });

}

function extend(obj, src) {
    for (const key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}


/*function getDoctorList(state) {
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
        data: { state },
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSONP',
        success(res) {
            if(typeof docListthValue == "undefined")
                $("#findyourdoctor, .listLink").removeClass("disableThis");
            else{
                $("#findyourdoctor").removeClass("disableThis");
            }
            $(".findDoctor").removeClass("loader");
            console.log("success");
            doctors = res.data.docs;
            $.each(doctors, (index, value) => {
                doctors[index].label = ` ${doctors[index].name} ${doctors[index].clinic_name} ${doctors[index].address_1} ${doctors[index].city} ${doctors[index].phone} ${doctors[index].postcode}`;
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

            typeaheadcheck();
            if(typeof docListthValue != "undefined" && docListthValue){
                $("#docListth").focus();
            }

        },
        timeout: 15000,
        error(res) {
            console.log(res)
        }

    });
}*/

//=object strrt for validations
/*objectForValidations.formOneValidation = () => {
    $('.left_eye').removeClass('error');
    $('.right_eye').removeClass('error');
    if (($("#leftEye").val() != null && $("#leftEye").val() != "") && ($("#rightEye").val() != null && $("#rightEye").val() != "")) {
        $(".nextStepButton[data-CrStepNo='0']").removeClass("disableNext");
        $('.form_error_msg').addClass('hide');
        return true
    }
    setTimeout(() => {
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
}*/

/*objectForValidations.formTwoValidation = () => {
    if ($("#docListHidden").val() != "") {
        $(".steps").find("a[href='#step2'] div").addClass("done");
        const selectedListCookie = selectingCookieSelectedList();
        $(".reviews .desc").last().html(selectedListCookie);
        $("#leftSelected").text($("#leftEye").val())
        $("#rightSelected").text($("#rightEye").val())
        return true;
    }
    return false;
}*/


function removeDocList() {
    const $ulforSearch = $(".tt-menu1 ul");
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



/*//========clicking of next button
$(document).on("click", ".nextStepButton", function(e) {
    const currentIndex = getIndex();
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
    const activateStepNo = parseInt($(this).attr("data-EnStepNo"));
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
})*/

let dragging = false;
//=======on click of li on step 2
$(document).on("click touchend", ".doclistSelect", function(e) {

    e.stopPropagation();
    e.preventDefault();
    if (dragging == false) {
        cookieValues.finalSearchValue = $('#docListth').typeahead('val');
        const htmlSelected = $(this).find(".disableThis").html();
        selectedList = htmlSelected;

        const rStrong = new RegExp('<strong class="tt-highlight">|</strong>', "g");
        selectedList = selectedList.replace(rStrong, "");
        
        const rAmp = new RegExp('&amp;', "g");
        selectedList = selectedList.replace(rAmp, "&");
        
        document.cookie = `selectedList='${selectedList}'; path=/`;
        const Docid = $($(htmlSelected)[3]).text();
        console.log(`${Docid} hiddenId`)
        $("#docListHidden").val(Docid);
        cookieValues.docList = Docid
        document.cookie = `cookieValuesDetailed=${JSON.stringify(cookieValues)};  path=/`;
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
$(document).on("touchmove", ".doclistSelect", e => {
    dragging = true;
});

$(document).on("touchend", ".doclistSelect", e => {
    if (dragging)
        return;
});

$(document).on("touchstart", ".doclistSelect", e => {
    dragging = false;
});

//===========drag and drop handling for mobile


$(document).on("click", ".deleteSearch", () => {
    $("#SearchDoc").addClass("disableThis")
    $("#SearchDoc ul li").html("");
    $("#docListHidden").val("")
    $(".nextStepButton[data-CrStepNo='1']").addClass("disableThis");
    if ($(".steps").find("a[href='#step2'] div").hasClass("done")) {
        $(".steps").find("a[href='#step2'] div").removeClass("done");
        $("#tabs").tabs("option", "disabled", [2]);
    }
    cookieValues.docList = "";
    document.cookie = `cookieValuesDetailed=${JSON.stringify(cookieValues)};  path=/`;
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
    $(`.${$(this).attr('rel')}`).click();
})

//========clicking to checkout button
$(document).on("click", ".goToCheckout", () => {
    const bridgeUrl = bridgeUrlSelector;
    const doctor_id = $("#docListHidden").val();
    const right_eye = $("#leftEye").val();
    const left_eye = $("#rightEye").val();
    const attributeValues = `&doctor_id=${doctor_id}&right_power=${right_eye}&left_power=${left_eye}`;
    const utm_parms = abanalytics.setUtmParams("returnParams", utmToken);
    checkoutURL = bridgeUrl + utm_parms + attributeValues;
    document.location.href = checkoutURL;
})

/*$(document).on("change", "#searchDoctor", () => {
    (eventFiredStepTwo.homeState == false) ? (track.customEventFire("DoctorStateSelected"), eventFiredStepTwo.homeState = true) : "";
    const SelectedState = $("#searchDoctor").val();
    //var cookieValues = {leftEye:"", rightEye: "", homeStateId: "", homeState : "", docList: "", currentState : 0};
    cookieValues.homeStateId = mIndexState[SelectedState]
    cookieValues.homeState = SelectedState;
    document.cookie = `cookieValuesDetailed=${JSON.stringify(cookieValues)};  path=/`;
    $(".deleteSearch").click();
    getDoctorList(SelectedState);
});*/

$(document).on("click", "#doctorIsnt", () => {
    track.customEventFire("DoctorNotListed");
    $("#doctorModal").fadeIn();
});

$(document).on("click", ".closeDialog", () => {
    $(".modalForm").removeClass("error")
    $("#modalError").addClass("hide");
    $("#modalErrorOne").addClass("hide");
    $("#doctorModal").fadeOut();
})

$(document).on("click", "body", e => {
    if ($("#doctorModal").css("display") == "block" && $(e.target).attr("class") == "overlayBg") {
        $(".modalForm").removeClass("error")
        $("#modalError").addClass("hide");
        $("#modalErrorOne").addClass("hide");
        $("#doctorModal").fadeOut();
    }
})

/*objectForValidations.formThreeModalValidation = (docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, checkall) => {
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

    const myValues = `${BdocName}${BClinicName}${BdocCity}`;
    return myValues;
}*/

var minLengthReq = new Array(5, 5, 3);
const validCombination = new Array("110", "011", "101", "111");

$(document).on("click", "#submitDoc", () => {
    const docName = $("input[name='doctorName']").val().trim();
    const ClinicName = $("input[name='clinicName']").val().trim();
    const docCity = $("input[name='docCity']").val().trim();
    const BdocName = 0;
    const BClinicName = 0;
    const BdocCity = 0;
    const myValues = objectForValidations.formThreeModalValidation(docName, ClinicName, docCity, BdocName, BClinicName, BdocCity, 1);

    //myValues = parseInt(myValues);

    if ($.inArray(myValues, validCombination) > -1){
        track.customEventFire("DoctorAddedAndSelected");
        track.customEventFire("DoctorSelected");
        const newCreatedId = getNewlyCreatedDocId(docName, ClinicName, docCity);
    }
    else {
        let errorDisplay = "";
        $(".modalForm").each(function() {
            
            errorDisplay += $(this).val().trim().length;
            
        });
        //=-=========check which error  msg to show
        const abc = new RegExp("0", "g");
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
    const $name = $(this).attr("name");
    const InputName = $(`input[name='${$name}']`).val().trim();
    var BdocName = 0;
    var BClinicName = 0;
    var BdocCity = 0;
    if ($name == "doctorName")
        var myValues = objectForValidations.formThreeModalValidation(InputName, "", "", BdocName, "", "", 0);
    else if ($name == "clinicName")
        var myValues = objectForValidations.formThreeModalValidation("", InputName, "", "", BClinicName, "", 0);
    else if ($name == "docCity")
        var myValues = objectForValidations.formThreeModalValidation("", "", InputName, "", "", BdocCity, 0);

    if (myValues == 1 && $(`input[name='${$name}']`).hasClass("error")) {
        $(`input[name='${$name}']`).removeClass("error")
    }

    //====enable disable button
    const docName = $("input[name='doctorName']").val().trim();
    const ClinicName = $("input[name='clinicName']").val().trim();
    const docCity = $("input[name='docCity']").val().trim();
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
    const s = {
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
        success(res) {
            if (res.status == "success") {
                const docId = res.data.doc.id;
                $("#docListHidden").val(docId);
                let ElementAdded = `<div class ="searchNameHidden">${docName}</div>`;
                ElementAdded += `<div class = "searchHosHidden">${ClinicName}</div>`;
                ElementAdded += `<div class = "searchCityHidden" >${docCity}</div>`;
                ElementAdded += `<div class = "searchId" style="display:none">${docId}</div >`;
                selectedList = ElementAdded;
                document.cookie = `selectedList=${ElementAdded}; path=/`;
                ElementAdded += '<div class = "deleteSearch" ><img src = "images/delete_icon.png" alt = "" /></div>';
                $("#SearchDoc").removeClass("disableThis")
                $("#SearchDoc ul li").html("");
                $("#SearchDoc ul li").html(ElementAdded);
                cookieValues.docList = docId
                cookieValues.finalSearchValue = "";
                document.cookie = `cookieValuesDetailed=${JSON.stringify(cookieValues)};  path=/`;
                
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
        error(t) {
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
