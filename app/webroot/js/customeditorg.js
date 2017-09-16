function donotdelete(area, cb) {
    var tableid = $(area).closest('table')[0].id;
    console.log(tableid);
    var rowlength = $("#" + tableid + " tr:visible").length;
    //==========to atleast maintain a row for department
    if (rowlength <= 2) {
        alertbootbox("Atleast A Row Needs To Be There");
        return false;
    } else {
        cb();
    }
}
/*
 * Corevalues functionalities
 */

//==================editing Core values
$(document).on("click", "#editcorevalues", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($("#" + rowid + " #OrgCorevalues").is(":visible")) {
        alertbootbox("Please Save First Before Editing");
        return false;
    }
    var value = $("#" + rowid + " p#corevalue").text();
    //$("#" + rowid + " #colorpick").attr("type", "color");
    $("#" + rowid + " #saveunsave").val("unsave");
    $("#" + rowid + " #OrgCorevalues").css("display", "block");
    $("#" + rowid + " p#corevalue").css("display", "none");
    for (tmpvalue in js_arraycv) {
        if (tmpvalue == value) {
            console.log("Matched : "+value);
            return false;
        }
    }
    $("#" + rowid + " #othercv").css("display", "block");
    $("#" + rowid + " #saveunsave").val("unsave");
    $("#" + rowid + " #OrgCorevalues option[value=other]").prop("selected", "true");
    $("#" + rowid + " #OrgOtherDepartment").val(value).css("display", "block");
});


//========================saving corevalues
$(document).on("click", ".savecorevalues", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var rowsplit = rowid.split('_');
    var rownum = rowsplit[1];
    if ($("#" + rowid + " #corevalue").is(":visible")) {
        alertbootbox("Already Saved");
        return false;
    }
    var value = $("#" + rowid + " #OrgCorevalues").val();
    if (value == "other") {
        value = $("#" + rowid + " #OrgOtherDepartment").val();
        $("#" + rowid + " #OrgOtherDepartment").css("display", "none");
    }
    var startvalue = value;
    //value = trimAndLowerCaseString(value);
    if (value == "") {
        alertbootbox("Please Select Core values First");
        return false;
    }
    var rowlength = $("#addcoretable tr").length;
    var othervalues = new Array();
    for (var i = 1; i < rowlength; i++) {
        if (i != rownum) {
            othervalues.push(trimAndLowerCaseString($('#addcorerow_' + i + ' #corevalue').text()));
        }
    }
    if ($.inArray(trimAndLowerCaseString(value), othervalues) != "-1") {
        alertbootbox("value already exist in core values");
        return false;
    }
    var colorcode = $("#" + rowid + " #colorpick").val();
    $("#" + rowid + " #colorpick").attr("type", "text");
    $("#" + rowid + " #colorpick").attr("value", colorcode);
    $("#" + rowid + " #saveunsave").val("save");
    $("#" + rowid + " #OrgCorevalues").css("display", "none");
    if ($("#" + rowid + " p#corevalue").length) {
        $("#" + rowid + " p#corevalue").css("display", "block");
        $("#" + rowid + " p#corevalue").text(value);
    } else {
        $("<p id='corevalue'>" + startvalue + "</p>").appendTo("#" + rowid + " #corevaluesdropdown");
    }
});

//=========================on tick untick active status
$(document).on("change", ".OrgCvactivestatus", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var stats = $("#" + rowid + " #cvactive").val();
    if (stats == "active") {
        $("#" + rowid + " #cvactive").val("inactive");
    } else if (stats == "inactive") {
        $("#" + rowid + " #cvactive").val("active");
    }
});

//=========================on change select box
$(document).on('change', '#OrgCorevalues', function () {
    //find the row
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($("#" + rowid + " #OrgCorevalues").val() == "other") {
        $("#" + rowid + " #othercv").css("display", "block");
        $("#" + rowid + " #OrgOtherDepartment").css("display", "block");
    } else {
        $("#" + rowid + " #othercv").css("display", "none");
    }
});

//=========================on Deleting core values
$(document).on("click", "#deletecorevalues", function () {
    var obj = this;
    donotdelete(obj, function () {
        var rowvalue = $(obj).closest('tr');
        var rowid = rowvalue[0].id;
        $("#" + rowid + " #cvactive").val("delete");
        $("#" + rowid).hide();
    });

})



/*
 *Departments changes
 **/

//Editing departments
$(document).on("click", ".editdepartment", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;

    if ($("#" + rowid + " .departmentvalues").is(":visible")) {
        alertbootbox("Please Save First Before Editing");
        return false;
    }

    var value = $("#" + rowid + " p.departmentv").text();
    $("#" + rowid + " .departmentvalues").css("display", "block");
    $("#" + rowid + " p.departmentv").remove();
    $("#" + rowid + " .departmentsaveunsave").val("unsave");
    for (tmpvalue in js_arraydept) {
        if (tmpvalue == value) {
            $("#" + rowid + " .departmentvalues option[value=" + value + "]").prop("selected", "true");
            return false;
        }
    }
    $("#" + rowid + " .other_department").attr("type", "text");
    $("#" + rowid + " .departmentvalues option[value=other]").prop("selected", "true");
    $("#" + rowid + " .other_department").val(value);
});

//=========================saving department
$(document).on("click", ".savedepartment", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var rowsplit = rowid.split('_');
    var rownum = rowsplit[1];
    if ($("#" + rowid + " .departmentv").is(":visible")) {
        alertbootbox("Already Saved");
        return false;
    }
    var value = $("#" + rowid + " .departmentvalues").val();
    if (value == "") {
        alertbootbox("Please Select atleast a department");
        return false;
    }
    var rowlength = $("#adddepartmenttable tr").length;
    var othervalues = new Array();
    for (var i = 1; i < rowlength; i++) {
        if (i != rownum) {
            othervalues.push(trimAndLowerCaseString($('#adddepartment_' + i + ' .departmentv').text()));
        }
    }
    if (value == "other") {
        var othervalue = value;
        value = $("#" + rowid + " .other_department").val();
        $("#" + rowid + " .other_department").css("display", "none");
    }
    var startvalue = value;
    value = trimAndLowerCaseString(value);
    if ($.inArray(trimAndLowerCaseString(value), othervalues) != "-1") {
        alertbootbox("value already Saved");
        if (othervalue == "other") {
            $("#" + rowid + " .other_department").attr("type", "text");
            $("#" + rowid + " .other_department").css("display", "block");
        }
        return false;
    }
    $("#" + rowid + " .departmentsaveunsave").val("save");
    $("#" + rowid + " .departmentvalues").css("display", "none");
    $("#" + rowid + " .other_department").css("display", "none")
    $("<p class='departmentv'>" + startvalue + "</p>").appendTo("#" + rowid + " .departmentselectrow");
});

//=========================Deleting Department
$(document).on("click", ".deletedepartment", function () {
    var tableid = $(this).closest('table')[0].id;
    var rowlength = $("#" + tableid + " tr:visible").length;
    var obj = this;
    //donotdelete(obj, function(){
    var rowvalue = $(obj).closest('tr');
    if (rowlength == 2) {
        $("#adddepartmentdiv").hide();
    }
    var rowid = rowvalue[0].id;
    $("#" + rowid + " .departmentactive").val("delete");
    $("#" + rowid).hide();
    //});
})

//=========================checkbox change
$(document).on("change", ".departmentcheckbox", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var stats = $("#" + rowid + " .departmentactive").val();
    if (stats == "active") {
        $("#" + rowid + " .departmentactive").val("inactive");
    } else if (stats == "inactive") {
        $("#" + rowid + " .departmentactive").val("active");
    }
});

//=========================changing department selectbox values
$(document).on('change', '.departmentvalues', function () {
    //find the row
    console.log("asd");
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($("#" + rowid + " .departmentvalues").val() == "other") {
        $("#" + rowid + " .other_department").attr("type", "text");
        $("#" + rowid + " .other_department").css("display", "block");
        $("#" + rowid + " .departmentvalues").css("display", "block");
    } else {
        $("#" + rowid + " .other_department").attr("type", "hidden");
    }
});

/*
 * jobtitles
 */

//========================Editing Job title
$(document).on("click", ".editjobtitle", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($("#" + rowid + " .jobtitlevalues").is(":visible")) {
        alertbootbox("Please Save First Before Editing");
        return false;
    }
    var value = $("#" + rowid + " p.jobtitlev").text();
    $("#" + rowid + " .jobtitlevalues").css("display", "block");
    $("#" + rowid + " p.jobtitlev").remove();
    $("#" + rowid + " .jobtitlesaveunsave").val("unsave");
    for (tmpvalue in js_arrayjt) {
        if (tmpvalue == value) {
            //$("#"+rowid+" .jobtitlevalues option[value="+value+"]").prop("selected","true");
            return false;
        }
    }
    $("#" + rowid + " .other_department").attr("type", "text");
    $("#" + rowid + " .jobtitlevalues option[value=other]").prop("selected", "true");
    $("#" + rowid + " .other_department").val(value);
});

//=========================saving Job title
$(document).on("click", ".savejobtitle", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var rowsplit = rowid.split('_');
    var rownum = rowsplit[1];
    if ($("#" + rowid + " .jobtitlev").is(":visible")) {
        alertbootbox("Already Saved");
        return false;
    }
    var value = $("#" + rowid + " .jobtitlevalues").val();
    var startvalue = value;
    value = trimAndLowerCaseString(value);
    if (value == "") {
        alertbootbox("Please Select atleast a jobtitle");
        return false;
    }
    var rowlength = $("#addjobtitletable tr").length;
    $("#" + rowid + " .jobtitlesaveunsave").val("save");
    if (value == "other") {
        var othervalue = value;
        startvalue = value = $("#" + rowid + " .other_department").val();
        $("#" + rowid + " .other_department").css("display", "none");
    }
    var othervalues = new Array();
    for (var i = 1; i < rowlength; i++) {
        if (i != rownum) {
            othervalues.push(trimAndLowerCaseString($('#addjobtitle_' + i + ' .jobtitlev').text()));
        }
    }
    if ($.inArray(trimAndLowerCaseString(value), othervalues) != "-1") {
        alertbootbox("value already Saved");
        if (othervalue == "other") {
            $("#" + rowid + " .other_department").attr("type", "text");
            $("#" + rowid + " .other_department").css("display", "block");
        }
        return false;
    }
    $("#" + rowid + " .jobtitlevalues").css("display", "none");
    $("#" + rowid + " .other_department").css("display", "none")
    $("<p class='jobtitlev'>" + startvalue + "</p>").appendTo("#" + rowid + " .jobtitleselectrow");
});

//=========================//Deleting Job title
$(document).on("click", ".deletejobtitle", function () {
    var tableid = $(this).closest('table')[0].id;
    var rowlength = $("#" + tableid + " tr:visible").length;
    var obj = this;
    //donotdelete(obj, function(){
    var rowvalue = $(obj).closest('tr');
    var rowid = rowvalue[0].id;
    if (rowlength == 2) {
        $("#addjobtitlediv").hide();
    }
    $("#" + rowid + " .jobtitleactive").val("delete");
    $("#" + rowid).hide();
    //});
})

//=========================changing jobtitlecheck box
$(document).on("change", ".jobtitlecheckbox", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var stats = $("#" + rowid + " .jobtitleactive").val();
    if (stats == "active") {
        $("#" + rowid + " .jobtitleactive").val("inactive");
    } else if (stats == "inactive") {
        $("#" + rowid + " .jobtitleactive").val("active");
    }
});

//=========================changing select values
$(document).on('change', '.jobtitlevalues', function () {
    //find the row
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($("#" + rowid + " .jobtitlevalues").val() == "other") {
        $("#" + rowid + " .other_department").attr("type", "text");
        $("#" + rowid + " .jobtitlevalues").css("display", "block");
    } else {
        $("#" + rowid + " .other_department").attr("type", "hidden");
    }
});

/*
 * entities
 */

//=========================saving new entity
$(document).on('click', '.saveentity', function () {
    var rowvalue = $(this).closest('tr');
    var rowlength = $("#addentitytable tr").length - 1;
    var rowid = rowvalue[0].id;
    if ($('#' + rowid + ' .corevalue').is(':visible')) {
        alertbootbox("Already Saved");
        return false;
    }
    var value = $("#" + rowid + " .entitytextbox").val();
    var startvalue = value;
    value = trimAndLowerCaseString(value);
    value = value.trim();
    if (value == "") {
        alertbootbox("Enter Entity value");
        return false;
    }
    var allvalues = new Array();
    $("#addentitytable tr").each(function () {
        if (typeof ($(this).attr("id")) != "undefined") {
            if ($(this).find(".entitytextbox").attr("type") == "hidden") {
                var values = $(this).find(".entitytextbox").val();
                allvalues.push(trimAndLowerCaseString(values));
            }
        }
    })
    if ($.inArray(trimAndLowerCaseString(value), allvalues) != "-1") {
        alertbootbox("value already Saved");
        return false;
    }
    $("#" + rowid + " .entitytextbox").attr("type", "hidden");
    $("<p class='corevalue'>" + startvalue + "</p>").appendTo("#" + rowid + " .entityvaluestextbox");
    $("#" + rowid + " .entitysaveunsave").val("save");
});

//=======================editing new entity
$(document).on('click', '.editentity', function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    if ($('#' + rowid + ' .entitytextbox').is(':visible')) {
        alertbootbox("Save First Before Edit Saved");
        return false;
    }
    var value = $("#" + rowid + " .corevalue").text();
    $("#" + rowid + " .corevalue").remove();
    $("#" + rowid + " .entitytextbox").attr("type", "text");
    $("#" + rowid + " .entitytextbox").val(value);
    $("#" + rowid + " .entitysaveunsave").val("unsave");
});

//=========================on tick or untick of checkbox
$(document).on("change", ".entitycheckbox", function () {
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    var stats = $("#" + rowid + " .entityactive").val();
    if (stats == "active") {
        $("#" + rowid + " .entityactive").val("inactive");
    } else if (stats == "inactive") {
        $("#" + rowid + " .entityactive").val("active");
    }
});

//=========================deleting the row
$(document).on('click', '.deleteentity', function () {
    var tableid = $(this).closest('table')[0].id;
    var rowlength = $("#" + tableid + " tr:visible").length;
    //console.log(rowlength);
    var rowvalue = $(this).closest('tr');
    var rowid = rowvalue[0].id;
    //==========to atleast maintain a row for department
    if (rowlength == 2) {
        $("#addentitydiv").hide();
    }
    $('#' + rowid + ' .entityactive').val("delete");
    $("#" + rowid).hide();
});