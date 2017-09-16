//Forgot password
$(document).on("click", "#forgotPassword", function (e) {
    e.preventDefault();
    var module = $(this).attr("module");
    var url  = siteurl + "client/forgotPassword";
   $.ajax({
                type: "GET",
                url: url,
                success: function (response) {
                    $("#commonModal .modal-title").html("Forgot Password");
                    $("#commonModal .modal-body").html(response);
                    $("#commonModal").modal("show");
                    bindForgotPassword(module);
                    bindResetPassword(module);
                },
                error: function (response) {
                    alertbootbox(response);
                }
     });
});

function bindForgotPassword(module) {
    $("#forgotPasswordForm").ajaxForm({
         url: siteurl + module + "/forgotPassword",
        dataType: 'json',
        beforeSubmit: function () {
            return $("#forgotPasswordForm").valid();// TRUE when form is valid, FALSE will cancel submit
        },
        success: function (response) {
            alertbootbox(response.msg);
            
            if(response.success == true) {
//                $("#commonModal").modal("hide");
            }
        }
     });
     
     $("#forgotPasswordForm").validate({
         rules: {
             'email': {
                required: true,
                email: true
            }
         },
         messages: {
             'email': {
                required: "Email is required",
                email: "Invalid email"
            }
         }
     });
}

function bindResetPassword(module) {
    $("#resetPasswordForm").ajaxForm({
         url: siteurl + module + "/setPassword",
        dataType: 'json',
        beforeSubmit: function () {
            return $("#resetPasswordForm").valid();// TRUE when form is valid, FALSE will cancel submit
        },
        success: function (response) {
            alertbootbox(response.msg);
            
            if(response.success == true) {
                $("#commonModal").modal("hide");
            }
        }
     });
     
     $("#resetPasswordForm").validate({
         rules: {
             'verification_code': {
                required: true,
            },
            'password': {
                required: true,
                minlength: 8
            },
             'confirm_password': {
                equalTo: '#re_password',
            }
         },
         messages: {
             'verification_code': {
                required: "Enter secret code",
            },
            'password': {
                required: "Password is required",
                minlength: "Atleast 8 characters are required",
            },
            'confirm_password': {
                equalTo: "Confirm Password do not match",
            }
         }
     });
}