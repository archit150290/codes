//document ready start
$(document).ready(function () {

    //

        // form submit validation
        
        $("#changepasswordsubmit").on("click", function () {
        $("#UserResetpasswordForm").submit();
    });

            $("#UserResetpasswordForm").validate({
        rules: {
            'data[User][current_password]': {
                required: true,
                
                
            },
            'data[User][password]': {
                required: true,
                minlength: 8,
                
            }
            ,
            'data[User][confirm_password]': {
                required: true,
                minlength: 8,
                 equalTo: '#UserPassword'
                
            }
        },
        messages: {
            'data[User][current_password]': {
                required: "Current Password required",
            },
            'data[User][password]': {
                required: "New Password required",
                minlength: "At least {8} character",
            },
            'data[User][confirm_password]': {
                required: "Confirm Password required",
                minlength: "At least {8} character",
                equalTo: "Password do not match.",
            }
        }
    });
 
}); //document ready end
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
