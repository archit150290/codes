/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var aurl = ajaxUrl.url;
    jQuery.ajax({
            type: 'POST',
            url: aurl,
            data: {
                action: 'loadcookiestatic',
            },
            success: function (data, textStatus, XMLHttpRequest) {
               var result = JSON.parse(data);
               alert("success");
               jQuery("#paywalllogin").val(result.loginname);
               
            },
            error: function (MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            }
    });