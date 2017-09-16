/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function check_uniqueness_bottom(item) {
    check_uniqueness(item, "#new_user");
}

function check_uniqueness_pop(item) {
    check_uniqueness(item, "#new_user_pop");
}

function check_uniqueness(item, frmSelector) {
    var selector = item.selector;
    var tmpu = $(".login").first().attr("href").split("?"); 
    var offsetQ= "";
    if(tmpu.length>1){
        offsetQ = tmpu[1];
    }
    var msg = 'Email is already taken. <a href="https://www.stitchfix.com/login?'+offsetQ+'" title="Log In">Sign in?</a>';
    var targetUrl = "http://localhost/amp/html/stitchfix_new/validate_uniqueness.php";
    targetUrl = "http://localhost:3000/validate_uniqueness";
    if (window.location.hostname != 'localhost') {
        targetUrl = "https://ab.ampush.design/validate_uniqueness";
    }
    targetUrl = 'https://www.stitchfix.com/users/validate_uniqueness';
    var sData = $(frmSelector).serializeArray();
    var data = {};
    for (var x in sData) {
        var item = sData[x];
        data[item.name] = item.value;
    }
    //console.log(data);

    data = JSON.stringify(data);
    data = $(frmSelector).serialize();
    var cu = $.ajax({
        type: "POST",
        beforeSend: function (request)
        {
            //   request.setRequestHeader("Host", 'www.stitchfix.com');
        },
        url: targetUrl,
        data: data,
        "method": "post",
        success: function (r) {
            console.log(msg);
            if (r == 'false' || r == false) {
                setErrMsg(selector, msg);
            } else {
                setErrMsg(selector, '');
            }

        }
    });
    cu.fail(function (jqXHR, textStatus) {
        setErrMsg(selector, '');
    });

}

function getErrTag(msg) {
    return "<div class='error-msg' style='color:#ff5c61;font-size:11pt'><em><span>" + msg + "</span></em></div>";
}
function emptyErrTag(item) {
    return $(item).parent().find(".error-msg").find("span").html("");
}
function setErrMsg(item, msg) {
    if ($(item).parent().find(".error-msg").length) {
        $(item).parent().find(".error-msg").find("span").html(msg);
    } else {
        $(item).parent().append(getErrTag(msg));
    }
    return true;
}

var itemsConfig = {
    "user_first_name": {
        "selector": "#new_user #user_first_name"
        , "rules": {"empty": {"message": "This is a required field"}}
        , "validate_on_blur": true
    },
    "user_last_name": {
        "selector": "#new_user #user_last_name"
        , "rules": {"empty": {"message": "This is a required field"}}
    },
    "user_email": {
        "selector": "#new_user #user_email"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "email": {"message": "Email is not a valid email address."},
            "success_callback": {"name": "check_uniqueness_bottom"},
        },
    },
    "client_scale": {
        "selector": "input[type='radio'].rbtn-scale"
        , "rules": {
            "radio_empty": {"message": "This is a required field"},
        },
    },
    "user_client_attributes_shipping_postcode": {
        "selector": "#new_user #user_client_attributes_shipping_postcode"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "us_zip": {"message": "Zip Code is not a valid U.S. postal code. Currently, we only ship to U.S. addresses."},
        }
    },
};
var tmpItemName = "";
function validate(items) {
    this.items = items;
    this.status = false;
    this.tmpItemName = "";
    this.init = function () {
        if (Object.keys(this.items).length) {
            for (var itemName in this.items) {
                this.items[itemName]["status"] = false;
            }
        }
    };
}




validate.prototype.fire = function () {
    this.status = true;
    if (Object.keys(this.items).length) {
        for (var itemName in this.items) {
            //var item = this.items[itemName];
            this.applyValidation(itemName);
        }
    }
    return this.status;
};
validate.prototype.applyValidation = function (itemName) {
    var item = this.items[itemName];
    for (var ruleName in item.rules) {
        var rule = item.rules[ruleName];
        var status = true;
        switch (ruleName) {
            case "empty":
                status = this.checkEmpty(itemName, rule.message);
                break;
            case "radio_empty":
                status = this.checkRadioEmpty(itemName, rule.message);
                break;
            case "email":
                status = this.checkEmail(itemName, rule.message);
                break;
            case "branded_email":
                status = this.checkBrandedEmail(itemName, rule.message);
                break;
            case "us_zip":
                status = this.checkUSZip(itemName, rule.message);
                break;
            case "success_callback":
                var callback_function = new Function(rule.name);
                window[rule.name](item);
                break;
        }
        if (!status) {
            console.log("status false for: " + itemName);

            this.status = false;
            break;
        }
    }
};
validate.prototype.checkEmpty = function (itemName) {
    var item = this.items[itemName];
    var status = false;
    var selector = item.selector;
    var msg = item.rules.empty.message;

    if ($.trim($(selector).val()) == "") {


        setErrMsg(selector, msg);


    } else {
        if ($(selector).parent().find(".error-msg").length) {
            emptyErrTag(selector);
        }
        status = true;
    }
    item.status = status;
    return item.status;
};
validate.prototype.checkRadioEmpty = function (itemName) {
    var item = this.items[itemName];
    var status = false;
    var selector = item.selector;
    var msg = item.rules.radio_empty.message;
    var errElem = $(selector).first().parent().parent();
    if (typeof $(selector + ":checked").val() == "undefined" || $(selector + ":checked").val() == "") {
        setErrMsg(errElem, msg);
    } else {
        if ($(errElem).parent().find(".error-msg").length) {
            emptyErrTag(errElem);
        }
        status = true;
    }
    item.status = status;
    return item.status;
};
validate.prototype.checkEmail = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.email.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(/^[A-Za-z0-9._%+\-']+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkBrandedEmail = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.branded_email.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(/\.(com|edu|net|biz|org|us|ca|gov|uk)$/);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkUSZip = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.us_zip.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(/^\d{5}(-?\d{4})?$/);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
validate.prototype.checkCustomExp = function (itemName) {
    var item = this.items[itemName];
    var selector = item.selector;
    var msg = item.rules.custom_exp.message;
    var str = $.trim($(selector).val());
    var patt = new RegExp(regexVal);
    var status = patt.test(str);
    if (status) {
        emptyErrTag(selector);
    } else {
        setErrMsg(selector, msg);
    }

    item.status = status;
    return item.status;
};
var objValidate = new validate(itemsConfig);

$(document).on('blur', itemsConfig.user_first_name.selector, function (event) {
    objValidate.applyValidation("user_first_name");
});

$(document).on('blur', itemsConfig.user_last_name.selector, function (event) {
    objValidate.applyValidation("user_last_name");
});

$(document).on('blur', itemsConfig.user_email.selector, function (event) {
    objValidate.applyValidation("user_email");
});
$(document).on('blur', itemsConfig.user_client_attributes_shipping_postcode.selector, function (event) {
    objValidate.applyValidation("user_client_attributes_shipping_postcode");
});
$(document).on('submit', "#new_user", function (event) {
    //mouseflow.formSubmitAttempt('#new_user');
    objValidate.fire();
    console.log(objValidate.status);

    var url = $('#new_user').attr("action");
    var urlParams = getQueryParams(url);
    if (!("utm_source" in urlParams) || urlParams["utm_source"] != "ampush") {
        if ($.trim(url).indexOf("?") >= 0) {
            urlParams["utm_source"] = "ampush";
            var urlParamsStr = getQueryStr(urlParams);
            url = urlParamsStr != "" ? stitchfixUrl + "?" + urlParamsStr : stitchfixUrl;
        } else {
            url = url + "?utm_source=ampush";
        }
    }
    
    $('#new_user').attr("action", url);
    if (objValidate.status){
        $(this).find("input[type=submit]").val("SIGNING UP...");
       // mouseflow.formSubmitSuccess('#new_user');
        eventONSubmit($(this).serialize());
        chReferer();
    }else{
       // mouseflow.formSubmitFailure('#new_user');
    }
    
    return objValidate.status;
});

var itemsConfigPop = {
    "user_first_name": {
        "selector": "#new_user_pop #user_first_name"
        , "rules": {"empty": {"message": "This is a required field"}}
        , "validate_on_blur": true
    },
    "user_last_name": {
        "selector": "#new_user_pop #user_last_name"
        , "rules": {"empty": {"message": "This is a required field"}}
    },
    "user_email": {
        "selector": "#new_user_pop #user_email"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "email": {"message": "Email is not a valid email address."},
            "success_callback": {"name": "check_uniqueness_pop"},
        },
    },
    "client_scale": {
        "selector": "input[type='radio'].rbtn-scale-pop"
        , "rules": {
            "radio_empty": {"message": "This is a required field"},
        },
    },
    "user_client_attributes_shipping_postcode": {
        "selector": "#new_user_pop #user_client_attributes_shipping_postcode"
        , "rules": {
            "empty": {"message": "This is a required field"},
            "us_zip": {"message": "Zip Code is not a valid U.S. postal code. Currently, we only ship to U.S. addresses."},
        }
    },
};
var selectedForm = "";
$("#sizeChart-pop").on('show.bs.modal', function () {

});

$(document).on('click', '.size-chart td', function (event) {
    var validClass = {"xs": 37, "s": "38", "m": 39, "l": 40, "xl": 41};
    for (var cc in validClass) {
        if ($(this).hasClass(cc)) {
            $(".rbtn-scale-pop").parent().removeClass("active");
            $(".rbtn-scale-pop[value=" + validClass[cc] + "]").attr("checked", "checked");
            $(".rbtn-scale-pop[value=" + validClass[cc] + "]").parent().addClass("active");
            $(".rbtn-scale").parent().removeClass("active");
            $(".rbtn-scale[value=" + validClass[cc] + "]").attr("checked", "checked");
            $(".rbtn-scale[value=" + validClass[cc] + "]").parent().addClass("active");
            break;
        }
    }
    $("#sizeChart-pop").modal('hide');
});
var objValidatePop = new validate(itemsConfigPop);
$(document).on('blur', itemsConfigPop.user_first_name.selector, function (event) {
    objValidatePop.applyValidation("user_first_name");
});

$(document).on('blur', itemsConfigPop.user_last_name.selector, function (event) {
    objValidatePop.applyValidation("user_last_name");
});

$(document).on('blur', itemsConfigPop.user_email.selector, function (event) {
    objValidatePop.applyValidation("user_email");
});
$(document).on('blur', itemsConfigPop.user_client_attributes_shipping_postcode.selector, function (event) {
    objValidatePop.applyValidation("user_client_attributes_shipping_postcode");
});
$(document).on('submit', "#new_user_pop", function (event) {
    if ($(".rbtn-scale-pop[type=radio]:checked").length < 1) {
        $(".rbtn-scale-pop").parent().removeClass("active");
        $(".rbtn-scale-pop[value=39]").attr("checked", "checked");
        $(".rbtn-scale-pop[value=39]").parent().addClass("active");
    }
    var url = $('#new_user_pop').attr("action");
    var urlParams = getQueryParams(url);
    if (!("utm_source" in urlParams) || urlParams["utm_source"] != "ampush") {
        if ($.trim(url).indexOf("?") >= 0) {
            urlParams["utm_source"] = "ampush";
            var urlParamsStr = getQueryStr(urlParams);
            url = urlParamsStr != "" ? stitchfixUrl + "?" + urlParamsStr : stitchfixUrl;
        } else {
            url = url + "?utm_source=ampush";
        }
    }
    $('#new_user_pop').attr("action", url);
    //alert($('#new_user_shop').attr("action"));
    $("#popupsize").val($(".rbtn-scale-pop[type=radio]:checked").val());
    //mouseflow.formSubmitAttempt('#new_user_pop');
    objValidatePop.fire();
    if (objValidatePop.status){
        $(this).find("input[type=submit]").val("SIGNING UP...");
        //mouseflow.formSubmitSuccess('#new_user_pop');
        eventONSubmit($(this).serialize());
        chReferer();
    }else{
        //mouseflow.formSubmitFailure('#new_user_pop');
    }
    
    return objValidatePop.status;
});